/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 09:54:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-22 17:59:39
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

const {
  override,
  disableEsLint,
  useBabelRc,
  fixBabelImports,
  addDecoratorsLegacy
} = require("customize-cra");


const _addWebpackModuleRule = () => {
  return addWebpackModuleRule({});
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
  useBabelRc(), //使用babelrc
  removeModuleScopePlugin(), //允许从src外部导入模块
  _addWebpackModuleRule(), //添加module配置
  _fixBabelImports() //动态引入插件
);
