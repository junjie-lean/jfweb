/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 16:06:25
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-15 16:59:34
 */

/**
 * @description Provider
 */

import React, { PureComponent } from "react";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import RouterRelation from "./router";



export default class APP extends React.Component {
  render() {
    return (
      <>
        <LocaleProvider locale={zhCN}>
          <RouterRelation />
        </LocaleProvider>
      </>
    );
  }
}
