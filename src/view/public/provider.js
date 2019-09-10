/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 16:06:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-10 16:35:29
 */

/**
 * @description Provider
 */

import React from "react";
import { ConfigProvider, message } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import RouterRelation from "../router/router";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import promiseMiddleware from "redux-promise";
import allReducers from "../../redux/index.reducers";
import { setConfig } from "./../../util/request";
import { setWSConfig, request as requestWS } from "./../../util/request-ws.js";
import { setSecretKey } from "./../../util/encrypt";

let store;

{
  /**
   * @description 数据服务初始化
   */
  // setConfig("http://10.10.1.232:1612", "token", "orgcode");
  setConfig("http://localhost:9000", "token", "orgcode");
  // setWSConfig("ws://10.10.1.30:3000", "token", "orgcode");
  setSecretKey();
}

{
  /**
   * @description reducers合并，并创建store和router:
   */
  store = createStore(allReducers, applyMiddleware(thunk));
}

{
  /**
   * @description antd 初始化设置
   */
  message.config({
    top: 100,
    duration: 2,
    maxCount: 1
  });
  //other Config.....
}

{
  /**
   * @description  生产环境反调试
   */
  if (process.env.NODE_ENV !== "development") {
    if (window.console) {
      let _console = window.console;
      for (let item in window.console) {
        window["console"][item] = () => {
          _console.log("未能输出，原因是开启了生产环境反调试模式！");
        };
      }
    }
  }
}

export default class APP extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <RouterRelation />
        </Provider>
      </ConfigProvider>
    );
  }
}
