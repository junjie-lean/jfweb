/*
 * @Author: junjie.lean
 * @Date: 2019-08-27 11:20:11
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-30 14:11:01
 */

/**
 * @description 框架说明
 */

import React from "react";
import { withRouter } from "react-router-dom";

@withRouter
export default class Des extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props)
    let { path } = this.props.match;
    console.log(path);
    return <div>description:{path}</div>;
  }
}
