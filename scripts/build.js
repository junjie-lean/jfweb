/*
 * @Author: junjie.lean
 * @Date: 2019-04-16 14:33:09
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-17 13:26:48
 */

/**
 * @env {String} NODE_ENV moda
 * @description 手动调用react-app-rewired的方法重置打包逻辑
 */

const spawn = require("cross-spawn");
const zipper = require("zip-local");
process.on("unhandledRejection", err => {
  throw err;
});

let option = {
  env: {
    ...process.env,
    NODE_ENV: "production"
  },
  cwd: process.cwd(),
  stdio: "inherit",
  encoding: "utf8",
  shell: process.platform == "win32",
  // killSignal:"quit sign",
  timeout: 5000,
  detached: false
};

const start = spawn("npx", ["react-app-rewired", "build"], {
  ...option
});

start.on("error", err => {
  console.log("无法启动脚手架进程", err);
});

start.on("close", (code, signal) => {
  if (code == 0 && !signal) {
    zipper.sync
      .zip("./build")
      .compress()
      .save("build.zip");
  }
});
