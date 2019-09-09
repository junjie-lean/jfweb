/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 09:54:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-06 14:06:52
 */

/**
 * @description webpack配置override
 * @writable writable
 */

/*
    addTslintLoader
    addExternalBabelPlugin
    addExternalBabelPlugins
    addBabelPlugin
    addBabelPlugins
    addBabelPreset
    addBabelPresets
    babelInclude
    babelExclude
    fixBabelImports
    addDecoratorsLegacy
    useBabelRc
    disableEsLint
    useEslintRc
    enableEslintTypescript
    addWebpackAlias
    addWebpackResolve
    addWebpackPlugin
    addWebpackExternals
    addWebpackModuleRule
    addBundleVisualizer
    adjustWorkbox
    addLessLoader
    addPostcssPlugins
    disableChunk
    removeModuleScopePlugin
    watchAll
*/

const path = require("path");
const webpack = require("webpack");
// const autoprefixer = require("autoprefixer");
// const rewireSVGLoader = require("react-app-rewire-svg-react-loader");

const {
  override,
  disableEsLint,
  fixBabelImports,
  addDecoratorsLegacy,
  removeModuleScopePlugin,
  addWebpackModuleRule,
  addWebpackPlugin,
  addBabelPlugins,
  addBabelPlugin,
  addBabelPresets,
  addBabelPreset,
  addLessLoader,
  addPostcssPlugins,
  overrideDevServer,
  watchAll
} = require("customize-cra");

//废弃
const rewireSVG = () => (config, env) => {
  return rewireSVGLoader(config, env);
};

const setWebpack = () => (config, env) => {
  config.mode =
    process.env.NODE_ENV == "production" ? "production" : "development";
  let _config = {
    ...config,
    devtool: process.env.NODE_ENV == "production" ? false : "inline-source-map",
    entry: {
      app: "./src/index.js"
    },
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: "static/js/index.js"
    }
  };
  console.log(config.mode);
  return _config;
};

const setWebpackDevServer = () => config => {
  return {
    ...config,
    watchContentBase: true,
    hot: true,
    publicPath: "/",
    watchOptions: {
      ignored: "/node_modules/"
    }
  };
};

const rawLoader = {
  test: [/\.txt$/i, /\.svg$/i],
  use: "raw-loader"
};

const urlLoader = {
  test: [/\.bmp$/i, /\.gif$/i, /\.jpe?g$/i, /\.png$/i],
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 10240, //byte  10k
        fallback: "file-loader"
      }
    }
  ]
  // use: "file-loader"
};

const babelLoader = {
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.s?css$/i],
  use: {
    loader: require.resolve("babel-loader"),
    options: {
      name: "static/media/[name].[hash:8].[ext]"
    }
  }
};

const fileLoader = {
  // exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.s?css$/],
  // loader: require.resolve("file-loader"),
  // options: {
  //   name(file) {
  //     if (process.env.NODE_ENV === "development") {
  //       return "[path][name].[ext]";
  //     }
  //     return "[contenthash].[ext]";
  //   }
  // }
  test: /\.(png|jpe?g|gif)$/,
  use: "file-loader"
};

const cssLoader = {
  test: /\.(sc|c|sa)ss$/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        sourceMap: process.env.NODE_ENV == "development"
      }
    },
    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        sourceMap: true,
        plugins: loader => [
          require("autoprefixer")({
            browsers: require("./../package").browserslist
          })
        ]
      }
    },

    {
      loader: "sass-loader",
      options: {
        sourceMap: process.env.NODE_ENV == "development"
      }
    }
  ]
};

const _fixBabelImports = libName => {
  let info = {
    libraryName: libName,
    style: "css"
  };
  if (libName == "antd") {
    info.libraryDirectory = "es";
  }
  return fixBabelImports("import", info);
};

module.exports = {
  webpack: override(
    addDecoratorsLegacy(), //装饰器
    disableEsLint(), //禁用eslint
    removeModuleScopePlugin(), //允许从src外部导入模块
    addWebpackModuleRule(rawLoader), //添加raw-loader配置
    // addWebpackModuleRule(urlLoader), //添加url-loader配置
    // addWebpackModuleRule(fileLoader), //添加file-loader配置
    // addWebpackModuleRule(cssLoader), //添加css-loader配置
    // addWebpackModuleRule(babelLoader), //添加babel-loader配置
    _fixBabelImports("antd"), //动态引入antd插件
    // _fixBabelImports("antd-mobile"), //动态引入antd-mobile插件
    addBabelPlugins("@babel/transform-runtime"), //添加babel-plugins配置
    addBabelPresets("@babel/react", "@babel/env"), //添加babel-presets配置
    // addWebpackPlugin(new webpack.HotModuleReplacementPlugin()), //添加热更插件
    // rewireSVG(), //添加svg支持
    addLessLoader(), //添加less支持
    setWebpack() //针对webpack的配置
  ),
  devServer: overrideDevServer(
    // watchAll(), //添加all
    setWebpackDevServer() //set webpack-dev-server
  )
};
