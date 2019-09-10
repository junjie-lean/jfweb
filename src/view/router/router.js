/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 15:53:28
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-09 15:39:39
 */

/**
 * @description 路由处理逻辑
 */

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Loading from "../pages/loading";
import Home from "../pages/home";
import DesRouter from "./desRouter";

export default class RouterRelation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={Loading} />
          <Route exact path="/home/xxx/aaa/ccc/:" component={Home} />
          <Route path="/loading" component={Loading} />
          <Route path="/des/:id" component={DesRouter} />
          <Redirect to="/loading" />
        </Switch>
      </Router>
    );
  }
}
