/*
 * @Author: junjie.lean
 * @Date: 2019-08-06 13:48:01
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-29 09:56:31
 */

/**
 * @description websocket的封装
 */

let requestWSinit;

let setConfig = serverAddr => {
  if (!requestWSinit) {
    requestWSinit = new WebSocket(serverAddr);
  }
};

export default { requestWSinit, setConfig };
