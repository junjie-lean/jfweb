/*
 * @Author: junjie.lean
 * @Date: 2019-08-23 13:20:45
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-30 14:13:48
 */

/**
 * @description 所有home组件的请求方法写在这里
 */

import { request as Ajax } from "./../util/request.js";

export const getData = () => {
  return Ajax("auth/login", { a: 1 }, e => {
    console.log(e.data);
  });
};
