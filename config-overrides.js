/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 09:54:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-23 11:09:12
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
  test: [/\.txt$/, /\.svg$/],
  use: "raw-loader"
};

const urlLoader = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve("url-loader"),
  options: {
    limit: 10000,
    name: "static/media/[name].[hash:8].[ext]"
  }
};

const _fixBabelImports = () => {
  return fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  });
};

//bable的present配置项
const babelPresets = [
  "react-app",
  "@babel/preset-env",
  "module:@babel/polyfill"
];

//bable的plugin配置项
const babelPlugins = ["@babel/transform-runtime"];

module.exports = override(
  addDecoratorsLegacy(), //装饰器

  disableEsLint(), //禁用eslint

  removeModuleScopePlugin(), //允许从src外部导入模块

  _fixBabelImports(), //动态引入插件

  addBabelPlugins("@babel/transform-runtime"), //添加babel-plugins配置

  addBabelPresets("@babel/react", "@babel/env") //添加babel-presets配置

  // addWebpackModuleRule(urlLoader), //添加url-loader配置
  // addWebpackModuleRule(rawLoader), //添加raw-loader配置
  // addWebpackModuleRule({ test: /\.txt$/, use: "raw-loader" }),
);
