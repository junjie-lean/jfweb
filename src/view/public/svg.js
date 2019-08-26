/*
 * @Author: junjie.lean
 * @Date: 2019-08-26 15:35:50
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-26 15:50:14
 */

/**
 * @description 公共可复用组件
 */
import React, { Component } from "react";
export default class SVG extends Component {
  render() {
    let style = {};
    if (this.props.width) style.width = this.props.width;
    if (this.props.height) style.height = this.props.height;
    if (this.props.color) style.color = this.props.color;

    let _className;
    if (this.props.className) {
      _className = `icon ${this.props.className}`;
    } else {
      _className = "icon";
    }

    /**增加点击事件 */
    let clickHandle = () => {
      if (this.props.onClick) {
        return this.props.onClick;
      } else {
        return () => {};
      }
    };

    return (
      <svg
        title=""
        className={_className}
        aria-hidden="true"
        style={style}
        onClick={clickHandle()}
      >
        <use xlinkHref={"#icon-" + this.props.type}>
          <title>{this.props.title || this.props.type}</title>
        </use>
      </svg>
    );
  }
}
