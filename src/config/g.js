/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 15:54:03
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-17 09:51:31
 */

/**
 * @description 全局配置
 */

import lang from "./../lang/zh_CN";

let isDev = process.env.NODE_ENV === "development" ? true : false;

const baseConfig = {
  systeamTitle: lang.systeam.systeamTitle /** */
};

function createGlobalConfig(isDev) {
  let obj = {
    ...baseConfig
  };
  return obj;
}

let g = createGlobalConfig(isDev);

if (window) {
  window.g = g;
}

export default g;
