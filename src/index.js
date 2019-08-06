import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import APP from "./view/public/provider";
import lang from "./lang/zh_CN";
ReactDOM.render(<APP />, document.getElementById("root"));
document.querySelector("head>title").innerHTML = lang.systeam.systeamTitle;
