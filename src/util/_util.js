/*
 * @Author: junjie.lean
 * @Date: 2019-04-16 12:59:32
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-16 13:03:03
 */

/**
 * @description 通用工具集
 */

/**
 *
 * @param { String } name
 * @scene browser
 * @description 从URL中获取指定参数
 * @returns 指定参数
 */
const getQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let w = window.location.href.slice(window.location.href.indexOf("/"));
  var r = w.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

/**
 *
 * @param { Object } pr
 * @scene browser
 * @description 新开新标签页面的跳转方法
 * @returns false
 */
const goWith = (pr = { to: "index", with: [] }) => {
  let url = window.location.href;
  let href = url.slice(0, url.indexOf("#") + 2);
  console.log(href);
  href += pr.to + "/" + pr.with.join("/");
  window.open(href);
  return false;
};

export default { getQueryString, goWith };
