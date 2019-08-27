/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 15:53:28
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-27 15:10:45
 */

/**
 * @description descroption页面的路由处理逻辑
 */

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Des from "./../pages/description";

export default class DesRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { path } = this.props.match;
    console.log(path);
    return (
      <>
        <Switch>
          <Route exact path={`${path}/one`} component={Des} />
          <Route path={`${path}/two`} component={Des} />
          <Redirect to={`${path}/one`} />
        </Switch>
      </>
    );
  }
}
