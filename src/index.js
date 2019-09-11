/*
 * @Author: junjie.lean
 * @Date: 2019-08-27 11:18:15
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-06 13:13:11
 */

/**
 * @description 入口文件
 * @writable  false
 */
import "core-js/shim"; 
import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import APP from "./view/public/provider";
import lang from "./lang/zh_CN";
import svgContent from "!!raw-loader!./media/svg/symbol-defs.svg";
document.querySelector("head>title").innerHTML = lang.systeam.systeamTitle;
document.querySelector("body").innerHTML += svgContent;
ReactDOM.render(<APP />, document.getElementById("root"));
