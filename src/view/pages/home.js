/*
 * @Author: junjie.lean
 * @Date: 2019-07-24 14:40:12
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-07 15:51:15
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
  constructor(props) {
    super(props);
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
