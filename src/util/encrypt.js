/*
 * @Author: junjie.lean
 * @Date: 2019-08-05 11:06:33
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-30 15:11:39
 */

/**
 * @description 提供加解密功能
 */

import crypto from "crypto-browserify";
const encryptionAlgorithm = "aes-128-cbc";

let sKey = "";

//是否使用package.json中的默认秘钥
export const setSecretKey = _constomerSKey => {
  if (_constomerSKey) {
    if (_constomerSKey.toString().length != 16) {
      throw new Error(
        "加密方式初始化失败，原因是加密秘钥只能是长度为16位的字符串"
      );
    } else {
      sKey = _constomerSKey;
    }
  } else {
    sKey = require("./../../package").config.defaultSKey;
  }
};

const checkSecretKeyIsCreate = () => {
  if (!sKey) {
    throw new Error(
      "加密失败，未能定义加密秘钥，请调用/src/util/encrypt.js中的setSecretKey()来创建加密秘钥！"
    );
  }
};

export const stringToHash = (str = "") => {
  checkSecretKeyIsCreate();
  let $cipher = crypto.createCipheriv(encryptionAlgorithm, sKey, sKey);
  let $$_hash = $cipher.update(str, "utf8", "hex");
  $$_hash += $cipher.final("hex");
  return $$_hash;
};

export const hashToString = (hash = "") => {
  checkSecretKeyIsCreate();
  let $decipher = crypto.createDecipheriv(encryptionAlgorithm, sKey, sKey);
  let $$_string = $decipher.update(hash, "hex", "utf8");
  $$_string += $decipher.final("utf8");
  return $$_string;
};

export const makeObjectUnreadable = (sourceObj = { key: "value" }) => {
  let obj = {};
  for (let _key in sourceObj) {
    let $_key = _stringToHash(_key);
    let $_val = _stringToHash(sourceObj[_key]);
    obj[$_key] = $_val;
  }
  return obj;
};

export const makeObjectReadable = (sourceObj = { key: "value" }) => {
  let obj = {};
  for (let _key in sourceObj) {
    let $_key = _hashToString(_key);
    let $_val = _hashToString(sourceObj[_key]);
    obj[$_key] = $_val;
  }
  return obj;
};
