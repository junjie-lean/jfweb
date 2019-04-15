/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 09:54:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-15 13:45:41
 */

/**
 * @description for overrides the global config
 */

// const { injectBabelPlugin } = require("react-app-rewired");
const {
  override,
  disableEsLint,
  useBabelRc,
  overrideDevServer
} = require("customize-cra");

module.exports = {
  webpack: override(disableEsLint(), useBabelRc()),
  devServer: overrideDevServer()
};
