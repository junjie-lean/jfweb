/*
 * @Author: junjie.lean
 * @Date: 2019-08-23 13:20:45
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-06 17:28:33
 */

/**
 * @description 所有home组件的请求方法写在这里
 */

import { request as Ajax } from "./../util/request.js";

export const getData = () => {
  // console.log(1)
  //return new Pormise()
  return Ajax("test", { a: 1 }, _res => {
    console.log(_res);
  }).then(res => {
    //。。。res
    return res.data;
  });
};

const aa = async () => {
  let res = await getData();
};

export const getUser = () => {
  return Ajax("get/user", { a: 1 }, e => {
    console.log(e.data);
  }).then(res => {
    //。。。res
  });
};

export const getUI = () => {};
