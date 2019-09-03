/*
 * @Author: junjie.lean
 * @Date: 2019-04-16 14:33:09
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-02 10:27:09
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
  shell: process.platform == "win32"
};

spawn.sync("npx", ["react-app-rewired", "build"], {
  ...option
});

// start.on("error", err => {
//   console.log("无法启动脚手架进程", err);
// });

// start.on("close", (code, signal) => {
//   if (code == 0 && !signal) {
//     zipper.sync
//       .zip("./build")
//       .compress()
//       .save("build.zip");
//   }
// });

let hash = "";
for (let i = 0; i < 10; i++) {
  hash += Math.floor(Math.random() * 16).toString(16);
}

let zipName = `build.${hash}.zip`;

zipper.sync
  .zip("./build")
  .compress()
  .save(zipName);

console.log("打包压缩完成：", zipName);
