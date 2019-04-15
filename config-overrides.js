/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 09:54:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-15 15:54:53
 */

/**
 * @description webpack配置override
 */

const {
  override,
  disableEsLint,
  useBabelRc,
  fixBabelImports
} = require("customize-cra");

module.exports = override(
  disableEsLint(),
  useBabelRc(),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  })
);
