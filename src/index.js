import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import APP from "./view/public/provider";
import lang from "./lang/zh_CN";
import svgContent from "!!raw-loader!./media/svg/symbol-defs.svg";
document.querySelector("head>title").innerHTML = lang.systeam.systeamTitle;
document.querySelector("body").innerHTML += svgContent;
ReactDOM.render(<APP />, document.getElementById("root"));
