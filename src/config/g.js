/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 15:54:03
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-16 09:25:17
 */

/**
 * @description 全局配置
 */

let isDev = process.env.NODE_ENV === "development" ? true : false;

function createGlobalConfig(isDev) {
  var a = 1,
    b = 2;
  return a, b;
}

let g = createGlobalConfig(isDev);

if (window) {
  window.g = g;
}

export default g;
