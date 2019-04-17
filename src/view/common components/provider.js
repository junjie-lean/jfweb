/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 16:06:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-17 16:27:23
 */

/**
 * @description Provider
 */

import React, { Component } from "react";
import { LocaleProvider, message } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import RouterRelation from "./router";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import allReducers from "./../../redux/index.reducers";
import thunkMiddleware from "redux-thunk";
import { setConfig, ajax } from "./../../util/request";

/**
 * @description axios初始化
 */
{
  setConfig("http://localhost:30000");
  // setConfig("http://localhost:30001");

  ajax[0]
    .request("api", {}, res => {
      console.log(".inner res", res);
    })
    .then(res => {
      console.log(".then  res", res.data);
    });
}

/**
 * @description reducers合并，并创建store和router:
 */
const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

/**
 * @description antd 初始化设置
 */

{
  message.config = {
    maxCount: 1
  };
}

/**
 * @description  生产环境反调试
 */

{
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
      <LocaleProvider locale={zhCN}>
        <Provider store={store}>
          <RouterRelation />
        </Provider>
      </LocaleProvider>
    );
  }
}
