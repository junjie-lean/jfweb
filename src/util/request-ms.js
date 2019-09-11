/*
 * @Author: junjie.lean
 * @Date: 2019-04-17 13:30:36
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-29 14:36:00
 */

/**
 * @name request-multi-service
 * @description axios 多后台请求方式封装
 */

import axios from "axios";
import _ from "lodash";

//axios原型的实例数组；
let axiosinsArr = [];
//实例对象下对应的请求方法数组；
let requestArr = [];
//默认请求体
let requestArgument = {
  version: "1.0",
  alias: "",
  token: "",
  orgcode: ""
};
let index = 0;

/**
 *
 * @param {Object or String} dataService
 * @description 参数可以为包含数据服务属性/token/orgcode的对象,也可以仅是数据服务地址
 */
const setConfig = dataService => {
  let instanceOfRequest, inxtanceOfUploadfile;
  if (typeof dataService === "string") {
    instanceOfRequest = axios.create({
      baseURL: dataService,
      headers: {}
    });
    inxtanceOfUploadfile = axios.create({
      baseURL: dataService,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    axiosinsArr.push({
      instanceOfRequest,
      inxtanceOfUploadfile
    });
  } else {
    instanceOfRequest = axios.create({
      baseURL: dataService.dataService,
      headers: {}
    });
    inxtanceOfUploadfile = axios.create({
      baseURL: dataService.dataService,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    requestArgument.token = dataService.token ? dataService.token : null;
    requestArgument.orgcode = dataService.orgcode ? dataService.orgcode : null;
  }

  axiosinsArr.push({
    instanceOfRequest,
    inxtanceOfUploadfile
  });
  requestArr.push({
    ind: index++,
    fetch: function(me, pr, scb, fcb = () => {}) {
      if (!me) {
        throw new Error("请求数据需要指定方法，参数method不能为空");
      } else {
        let thisIns = axiosinsArr[this.ind].instanceOfRequest;
        let params = {
          ...requestArgument,
          data: JSON.stringify({ ...pr })
        };
        let resPromise = thisIns.post(me, params);
        if (typeof scb === "function") {
          resPromise.then(Response => {
            scb(Response.data);
          });
        }
        resPromise.catch(fcb);
        return resPromise;
      }
    },
    uploadFile: (me, pr, scb, prog = () => {}, fbc = () => {}) => {
      if (!me) {
        throw new Error("请求数据需要指定方法，参数method不能为空");
      } else {
        let thisIns = axiosinsArr[this.ind].inxtanceOfUploadfile;
        let formDataObj = new FormData();
        for (let key in requestArgument) {
          formDataObj.append(key, requestArgument[key]);
        }
        for (let key in pr) {
          if (key == "file" || key == "files") {
            continue;
          }
          formDataObj.append(key, requestArgument[key]);
        }
        //file arr
        if (typeof pr.files === "object") {
          for (let file of files) {
            formDataObj.append("files", file);
          }
        } else {
          formDataObj.append("files", files);
        }

        let config = {
          onUploadProgress: progressEvent => {
            let v = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            prog(v);
          }
        };

        let resPromise = thisIns.post(me, formDataObj, config);
        if (typeof scb === "function") {
          resPromise.then(Response => {
            scb(Response.data);
          });
        }
        resPromise.catch(fcb);
        return resPromise;
      }
    }
  });
};

const request = requestArr;
export { setConfig, request };
