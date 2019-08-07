/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 16:06:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-07 15:01:21
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
import { setConfig, request } from "../../util/request-ms";

/**
 * @description 数据服务初始化
 */
{
  // setConfig("http://localhost:30000");
  // setConfig("http://localhost:30001");

  // request[0]
  //   .fetch("api", {}, res => {
  //     console.log(".inner res", res);
  //   })
  //   .then(res => {
  //     console.log(".then  res", res.data);
  //   });
}

/**
 * @description reducers合并，并创建store和router:
 */
const store = createStore(allReducers);

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
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <RouterRelation />
        </Provider>
      </ConfigProvider>
    );
  }
}
