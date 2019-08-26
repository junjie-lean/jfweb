/*
 * @Author: junjie.lean
 * @Date: 2019-08-23 13:20:45
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-23 14:27:27
 */

/**
 * @description 所有home组件的请求方法写在这里
 */

import request from "./../util/request.js";

const Ajax = request.request;

export const getData = () => {
  return Ajax("auth/login", { a: 1 }, e => {
    console.log(e.data);
  });
};
