/*
 * @Author: junjie.lean
 * @Date: 2019-08-23 13:20:45
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-09 14:49:01
 */

/**
 * @description 所有home组件的请求方法写在这里
 */

import { request as Ajax } from "../util/request.js";

export const getData = foo => {
  return Ajax("test", { a: 1 }, foo).then(res => {
    return res.data;
  });
};

export const getUser = () => {
  return Ajax("get/user", { a: 1 }, e => {
    console.log(e.data);
  }).then(res => {
    //。。。res
  });
};

export const getUI = () => {};
