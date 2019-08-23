/*
 * @Author: junjie.lean
 * @Date: 2019-07-24 14:40:12
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-23 15:56:32
 */

import React from "react";
import "./../../style/home.scss";
import {
  makeReadable,
  makeUnreadable,
  _stringToHash,
  _hashToString
} from "./../../util/encrypt";
import { connect } from "react-redux";
//redux-action example
import { getXXXData_action } from "../../redux/home.reducers";

// import Knock from "./../../media/svg/SVG/password";

@connect(
  state => state,
  { getXXXData_action }
)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    let version = require("./../../../package").version;
    this.state = {
      version
    };
  }
  componentDidMount() {
    //ie 兼容测试
    const foo = () => {
      getXXXData_action();
      [1, 2, 3].map(item => {});
    };
    foo();
  }
  static getDerivedStateFromProps(nextPorps, prevState) {
    console.log(nextPorps);
    return {
      ...prevState
    };
  }

  render() {
    return (
      <>
        <div className="jfapp-container">
          <h3>
            {/* <Knock /> */}
            {/* Hello jf-web-app */}
          </h3>
          {/* <h4>version : {this.state.version}</h4> */}
        </div>
      </>
    );
  }
}
