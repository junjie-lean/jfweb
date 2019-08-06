/*
 * @Author: junjie.lean
 * @Date: 2019-07-24 14:40:12
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-06 10:59:12
 */

import React from "react";
import "./../../style/home.scss";
import {
  makeReadable,
  makeUnreadable,
  _stringToHash,
  _hashToString
} from "./../../util/encrypt";
export default class Home extends React.Component {
  componentDidMount() {
    let o = {
      des:
        "可逆加密: 加密后可以解密;包括对称加密与非对称加密;对称加密双方采用共同密钥;非对称加密: 这种加密方式存在两个密钥，密钥-- 一种是公钥，一种是密钥。使用公钥加密，则只能使用密钥解密，使用密钥加密，则只能使用公钥解密;",
      name: "lean",
      arr: [
        "a",
        2,
        [1, 2],
        1.1,
        { a: 2 },
        undefined,
        null,
        function() {
          return false;
        },
        false
      ]
    };
    o.arr = JSON.stringify(o.arr);
    let a = makeUnreadable(o);
    console.log(a);
    let b = makeReadable(a);
    console.log(b);
  }
  render() {
    return (
      <>
        <div className="jfapp-container">
          <h3>Hello jf-web-app 0.2</h3>
        </div>
      </>
    );
  }
}
