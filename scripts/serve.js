/*
 * @Author: junjie.lean
 * @Date: 2019-09-26 15:06:48
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-26 15:13:36
 */

/**
 * @description 打包测试
 */

const express = require("express");
const app = express();
const PORT = 4001;
// app.get("/", (req, res, next) => {
//   //   res.redirect("/build");
//   next();
// });
app.use( express.static(__dirname + "/../build")).listen(PORT, () => {
  console.log("server is start at", PORT);
});
