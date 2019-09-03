/*
 * @Author: junjie.lean
 * @Date: 2019-08-23 13:20:45
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-02 16:35:02
 */

/**
 * @description 所有home组件的请求方法写在这里
 */

import { request as Ajax } from "./../util/request.js";

export const getData = () => {
  // console.log(1)
  return Ajax("auth/login", { a: 1 }, e => {
    console.log(e.data);
  }).then((res)=>{
    //。。。res
  });
};

const  aa  = async ()=>{
let res = await getData();

}

export const getUser = ()=>{
  return Ajax("get/user", { a: 1 }, e => {
    console.log(e.data);
  }).then((res)=>{
    //。。。res
  });
}

export const getUI = ()=>{
  
}