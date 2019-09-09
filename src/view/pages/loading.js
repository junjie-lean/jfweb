/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 16:28:09
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-06 17:15:14
 */

/**
 * @description loading页，解参跳转
 */

import React from "react";
import ReactLoding from "react-loading";
import { withRouter, Prompt } from "react-router-dom";
import G from "./../../config/g";
import U from "./../../util/_util";

@withRouter
export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  listenRouter() {
    let { listen, block } = this.props.history;
    listen((location, action) => {
      console.log(
        // `The current URL is ${location.pathname}${location.search}${location.hash}`
      );
    });
  }

  componentDidMount() {
    // console.log(this.props);
    // this.listenRouter();
    let _this = this;

    //跳转逻辑
    if (window.location.href.indexOf("rt") > -1) {
      //http://localhost:4000/loading?otherParams=1&orgcode=1&token=2&rt=%27{%22p%22:{%22a%22:1,%22b%22:2},%22t%22:%22/des/two/%22}%27
      let rt = U.getQueryString("rt");
      if (rt) {
        let rtObject = JSON.parse(rt.slice(1, -1)); //需要把字符串中一前一后的单引号去掉后才能json.parse出来
        setTimeout(() => {
          _this.props.history.push("/home");
        }, 100);
      }
    } else {
      //如果没有需要带参跳转
      //初始化跳转
      setTimeout(() => {
        _this.props.history.push("/home");
      }, 3000);
    }
  }

  render() {
    let types = [
      "blank",
      "balls",
      "bars",
      "bubbles",
      "cubes",
      "cylon",
      "spin",
      "spinningBubbles",
      "spokes"
    ];
    return (
      <>
        <div
          style={{
            position: "fixed",
            background: "#282c34",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <div style={{ margin: "100px 100px" }}>
            <span style={{ color: "#fff", margin: "0 0 30px" }}>
              {G.systeamTitle} v{require("./../../../package").version}  
            </span>
            <ReactLoding type={"bars"} color="#c0c0c0" />
          </div>
          <div
            style={{
              position: "fixed",
              bottom: 20,
              right: 62
            }}
          >
            <ReactLoding
              type={"spinningBubbles"}
              color="#fff"
              width="35px"
              height="35px"
            />
          </div>
        </div>
      </>
    );
  }
}
