import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import APP from "./view/public/provider";
import lang from "./lang/zh_CN";
// import svgContent from "./media/svg/symbol-defs.svg";

// document.querySelector("body").innerHTML += svgContent;
document.querySelector("head>title").innerHTML = lang.systeam.systeamTitle;

ReactDOM.render(<APP />, document.getElementById("root"));
