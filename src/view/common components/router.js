/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 15:53:28
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-16 10:40:39
 */

/**
 * @description 路由表
 */

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Loading from "./../pages/loading";

export default class RouterRelation extends React.Component {
  render() {
    return (
      <Router basename="/">
        <Switch>
          <Route path="/" />
          <Route path="/loading" component={Loading} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}
