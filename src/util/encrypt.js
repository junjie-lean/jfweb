/*
 * @Author: junjie.lean
 * @Date: 2019-08-05 11:06:33
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-06 13:43:52
 */

/**
 * @description 提供加解密功能
 */

import G from "./../config/g";
import crypto from "crypto-browserify";
const sKey = G.sKey;
const encryptionAlgorithm = "aes-128-cbc";

const _stringToHash = (str = "") => {
  let $cipher = crypto.createCipheriv(encryptionAlgorithm, sKey, sKey);
  let $$_hash = $cipher.update(str, "utf8", "hex");
  $$_hash += $cipher.final("hex");
  return $$_hash;
};

const _hashToString = (hash = "") => {
  let $decipher = crypto.createDecipheriv(encryptionAlgorithm, sKey, sKey);
  let $$_string = $decipher.update(hash, "hex", "utf8");
  $$_string += $decipher.final("utf8");
  return $$_string;
};

const makeUnreadable = (sourceObj = { key: "value" }) => {
  let obj = {};
  for (let _key in sourceObj) {
    let $_key = _stringToHash(_key);
    let $_val = _stringToHash(sourceObj[_key]);
    obj[$_key] = $_val;
  }

  return obj;
};

const makeReadable = (sourceObj = { key: "value" }) => {
  let obj = {};
  for (let _key in sourceObj) {
    let $_key = _hashToString(_key);
    let $_val = _hashToString(sourceObj[_key]);
    obj[$_key] = $_val;
  }
  return obj;
};

export { _stringToHash, _hashToString, makeUnreadable, makeReadable };
