/*
 * @Author: junjie.lean
 * @Date: 2019-08-06 13:48:01
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-30 13:56:20
 */

/**
 * @description websocket的封装
 */

import io from "socket.io-client";
import _util from "./_util";
const { typeCheck } = _util;
let requestWSinit = {};
let socketOnlineState = false;

//链接计数器,client端发送的是偶数，server端回复的是基数
let connect_start_digit = Math.floor(Math.random() * 1e10);
if (connect_start_digit % 2 == 1) {
  connect_start_digit++;
}

export const setWSConfig = (serverAddr, token, orgcode) => {
  let initialWSObjectFail = "初始化ws实例方法失败，原因：";
  
  if (!window["WebSocket"]) {
    throw new Error(initialWSObjectFail + "当前环境不支持webSocket功能!");
  }

  if (!serverAddr) {
    throw new Error(initialWSObjectFail + '未设置必要的参数："token"!');
  } else {
    let isAllowAddr = /^(ws:\/\/)(\d+|\.|:)+/i;
    if (!isAllowAddr.test(serverAddr)) {
      throw new Error(initialWSObjectFail + "非合法websocket服务地址");
    }
  }

  if (!token) {
    throw new Error(initialWSObjectFail + '未设置必要的参数："token"!');
  }

  if (!orgcode) {
    throw new Error(initialWSObjectFail + '未设置必要参数："orgcode"!');
  }

  if (!requestWSinit.isReady) {
    requestWSinit = {
      socket: io(serverAddr),
      isReady: true,
      token,
      orgcode
    };
  }
  openSocket();
};

const openSocket = () => {
  if (socketOnlineState) {
    console.error(
      "当前socket链接已打开，可直接调用util/request-ws中的sendMessage方法"
    );
  } else {
    socketOnlineState = true;
    // requestWSinit.open();
    // requestWSinit.addEventListener("open", () => {
    //   console.log("socket 链接已打开");
    // });
    requestWSinit.socket.open();
    requestWSinit.socket.on("connect", () => {
      console.log("socket connect");
    });
  }
};

export const closeSocket = () => {
  socketOnlineState = false;
  requestWSinit.socket.close();
};

export const request = (methods, params, scb, fcb) => {
  let currentConnectionDigit = connect_start_digit;
  console.log(
    "currentConnectionDigit for ",
    methods,
    " is ",
    currentConnectionDigit
  );
  if (!socketOnlineState) {
    throw new Error("socket链接为关闭状态");
  }
  let msgType = typeCheck(params);
  if (msgType !== "object") {
    throw new Error(
      "不能识别参数类型，参数只能是对象,但是当前参数类型为:",
      msgType
    );
  }
  //为下一次请求计数
  connect_start_digit += 2;
  params = {
    ...params,
    methods,
    token: requestWSinit.token,
    orgcode: requestWSinit.orgcode,
    currentConnectionDigit
  };
  requestWSinit.socket.emit(methods, params);
  return new Promise((resolve, reject) => {
    requestWSinit.socket.on(methods, data => {
      if (data.currentConnectionDigit - 1 == currentConnectionDigit) {
        //说明当前返回确实是当前请求的返回
        console.log("res:", data);
        if (scb || typeCheck(scb) == "function") {
          scb(data);
        }
        resolve(data);
      } else {
        //说明当前返回不是当前请求的返回
        console.log("not this request");
      }
    });
  });
};
