/*
 * @Author: junjie.lean
 * @Date: 2019-04-16 14:33:09
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-17 10:46:23
 */

/**
 * @env {Nummer} PORT
 * @env {String} NODE_ENV moda
 * @description 手动调用react-app-rewired的方法
 */

const spawn = require("cross-spawn");
process.on("unhandledRejection", err => {
  throw err;
});

let isDev = process.env.NODE_ENV === "development" ? true : false;
let PORT = parseInt(process.env.PORT, 10) || 3000;

let option = {
  env: {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV,
    isDev,
    PORT
  },
  cwd: process.cwd(),
  stdio: "inherit",
  encoding: "utf8",
  shell: process.platform == "win32",
  // killSignal:"quit sign",
  timeout: 5000,
  detached: false
};

const start = spawn("npx", ["react-app-rewired", "start"], {
  ...option
});

start.on("error", err => {
  console.log("无法启动脚手架进程", err);
});
