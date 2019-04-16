/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 15:54:03
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-16 10:45:20
 */

/**
 * @description 全局配置
 */

let isDev = process.env.NODE_ENV === "development" ? true : false;


const baseConfig = {
  systeamTitle:"佳发云巅组web端基础框架", /** */
}

function createGlobalConfig(isDev) {
  let obj = {
    ...baseConfig,
  }
  return obj;
}

let g = createGlobalConfig(isDev);

if (window) {
  window.g = g;
  
}

export default g;
