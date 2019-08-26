/*
 * @Author: junjie.lean
 * @Date: 2019-07-24 14:40:12
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-26 13:41:15
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
import { Button, message } from "antd";
//redux-action example
import { getXXXData_action } from "../../redux/home.reducers";

import SVGR from "./../../media/svg/SVG/live.svg";

import PNGR from "./../../media/picture/loading.gif";

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

  //不再推荐使用componentWillReceiveProps
  static getDerivedStateFromProps(nextPorps, prevState) {
    console.log("props 刷新：", nextPorps);
    return {
      ...prevState
    };
  }

  clickHandle(version) {
    message.success(`当前框架等级为：${version}`);
  }

  render() {
    return (
      <>
        <div className="jfapp-container">
          <h3>
            <SVGR style={{ height: 15 }} />
            Hello jf-web-app
          </h3>

          <div style={{ position: "absolute", top: 4, right: 4,width:30 }}>
            <img style={{ width: "100%" }} src={PNGR} alt="图片加载失败" />
          </div>
          <br />
          <Button
            type="primary"
            onClick={this.clickHandle.bind(this, this.state.version)}
          >
            show Versin
          </Button>
          <hr />
        </div>
      </>
    );
  }
}
