/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 16:06:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-16 10:39:42
 */

/**
 * @description Provider
 */

import React, { Component } from "react";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import RouterRelation from "./router";

class DataProvider extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <>{this.props.children}</>;
  }
}

export default class APP extends React.Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <DataProvider>
          <RouterRelation />
        </DataProvider>
      </LocaleProvider>
    );
  }
}
