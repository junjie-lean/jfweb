/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 16:06:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-23 14:27:15
 */

/**
 * @description Provider
 */

import React from "react";
import { ConfigProvider, message } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import RouterRelation from "../router/router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "../../redux/index.reducers";
import request from "./../../util/request";

/**
 * @description 数据服务初始化
 */
{
  const setConfig = request.setConfig;
  setConfig("http://10.10.1.156:1612/", "token", "orgcode");
}

/**
 * @description reducers合并，并创建store和router:
 */
const store = createStore(allReducers);

{
  /**
   * @description antd 初始化设置
   */
  message.config = {
    maxCount: 1
  };
}

{
  /**
   * @description  生产环境反调试
   */
  if (process.env.NODE_ENV !== "development") {
    if (window.console) {
      for (let item in window.console) {
        window["console"][item] = () => {
          return;
        };
      }
    }
  }
}

export default class APP extends React.Component {
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
