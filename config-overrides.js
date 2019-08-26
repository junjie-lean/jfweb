/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 09:54:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-26 09:14:38
 */

/**
 * @description webpack配置override
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
const autoprefixer = require("autoprefixer");
const rewireSVGLoader = require("react-app-rewire-svgr");

// const rewireSVG = () => (config, env) => {
//   return rewireSVGLoader(config, env);
// };

const {
  override,
  disableEsLint,
  fixBabelImports,
  addDecoratorsLegacy,
  removeModuleScopePlugin,
  addWebpackModuleRule,
  addBabelPlugins,
  addBabelPlugin,
  addBabelPresets,
  addBabelPreset
} = require("customize-cra");

const rawLoader = {
  test: /\.svg$/,
  // use: [
  //   {
  //     loader: "babel-loader",
  //     options: {
  //       presets: ["preact", "env"]
  //     }
  //   },
  //   {
  //     loader: "@svgr/webpack",
  //     options: { babel: false }
  //   }
  // ]
  use:"raw-loader"
};


const urlLoader = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve("url-loader"),
  options: {
    limit: 10000,
    name: "static/media/[name].[hash:8].[ext]"
  }
};

const fileLoader = {
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
  loader: require.resolve("file-loader"),
  options: {
    name: "static/media/[name].[hash:8].[ext]"
  }
};

const cssLoader = {
  test: /\.css$/,
  use: [
    require.resolve("style-loader"),
    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1
      }
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          autoprefixer({
            flexbox: "no-2009"
          })
        ]
      }
    }
  ]
};

const _fixBabelImports = () => {
  return fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  });
};

module.exports = override(
  addDecoratorsLegacy(), //装饰器

  disableEsLint(), //禁用eslint

  removeModuleScopePlugin(), //允许从src外部导入模块

  addWebpackModuleRule(rawLoader), //添加raw-loader配置

  // addWebpackModuleRule(urlLoader), //添加url-loader配置

  // addWebpackModuleRule(fileLoader), //添加file-loader配置

  // addWebpackModuleRule(cssLoader), //添加css-loader配置

  _fixBabelImports(), //动态引入插件

  addBabelPlugins("@babel/transform-runtime"), //添加babel-plugins配置

  addBabelPresets("@babel/react", "@babel/env") //添加babel-presets配置

  // rewireSVG()
);
