/*
 * @Author: junjie.lean
 * @Date: 2019-04-17 09:59:08
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-17 10:25:10
 */

/**
 * @description home index
 */

import React from "react";
import lang from "./../../lang/zh_CN";
import "./../../style/home.scss";

const homelang = lang.home;
export default class Home extends React.Component {
  render() {
    let { name, func } = homelang;
    return (
      <>
        <div className="jfapp-container">
          <h3>{name}</h3>
          <ul>
            {func.map(item => {
              return <li key={Math.random()}> {item}</li>;
            })}
          </ul>
        </div>
      </>
    );
  }
}
