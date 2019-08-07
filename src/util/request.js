/*
 * @Author: junjie.lean
 * @Date: 2019-08-06 14:21:02
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-08-07 15:30:30
 */

/**
 * @description axios 单后台请求方式封装
 */

import axios from "axios";

/**
 * 数据请求相关配置
 */
let requestConfig = {
    dataService: "", //数据服务入口
    version: "2.0",
    alias: "clweb",
    token: "",
    orgcode: ""
  },
  axiosIns;
let testData = {};
/**
 * 请求数据服务
 * @param {String} method 请求的方法
 * @param {JSON} params 提交参数
 */
const request = (method, params, success, fail, isBlob) => {
  let token = sessionStorage.getItem("token");
  let orgcode = sessionStorage.getItem("orgCode");
  let roleLevel = Number(sessionStorage.getItem("roleLevel"));
  let teachOrgId = sessionStorage.getItem("teachOrgId");

  let opts = requestConfig;
  if (!opts.dataService) {
    throw new Error(
      "需要设置数据服务地址，请执行_x.util.request.setConfig进行设置"
    );
  }

  if (method) {
    if (opts.testmode) {
      success({
        IsSuccess: true,
        ErrMsg: "",
        Data: testData[method]
      });
    } else {
      let postData = {
        version: opts.version,
        data: params || {},
        alias: opts.alias,
        token: token || "",
        orgCode: orgcode,
        roleLevel,
        teachOrgId
      };
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      if (isBlob) {
        config.responseType = "blob";
      }
      const ajaxObj = axiosIns.post(
        `/${method}`,
        `${JSON.stringify(postData)}`,
        config
      );
      ajaxObj
        .then(response => {
          if (typeof success === "function") {
            success(response.data);
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          if (typeof fail === "function") {
            fail({ code: err.code, msg: err.message });
          } else {
            console.log("request fail");
          }
        });

      if (typeof fail === "function") {
        ajaxObj.catch(fail);
      } else if (opts.globalFail) {
        ajaxObj.catch(opts.globalFail);
      }

      return ajaxObj;
    }
  } else {
    throw new Error("参数method不能为空");
  }
};

/**
 * @description 同时进行多个请求，全部完成时执行回调
 * @param {Array} requestList 请求列表[{method:'',params:{}}...]
 */
const requestMultiple = (requestList, success, fail) => {
  let reqlist, axiosobj;
  requestList = requestList || [];
  if (requestList.length === 0) {
    throw new Error("arguments 不能为空");
  }
  reqlist = requestList.map(item => {
    return request(item.method, item.params, item.success, item.fail);
  });
  axiosobj = axios.all(reqlist);
  if (typeof success === "function") {
    axiosobj.then(
      axios.spread(function() {
        let rets = [];
        for (let i = 0; i < arguments.length; i++) {
          rets.push(arguments[i]);
        }
        success(...rets);
      })
    );
  }

  if (typeof fail === "function") {
    axiosobj.catch(fail);
  }
};

/**
 * @description 设置数据服务配置
 * @param {String} dataService 数据服务地址
 */
const setConfig = (dataService, token, orgcode) => {
  dataService = dataService || "/";
  if (!_.endsWith(dataService, "/")) {
    dataService = dataService + "/";
  }
  requestConfig.dataService = dataService;
  axiosIns = axios.create({
    baseURL: dataService
  });

  requestConfig.token = token;
  requestConfig.orgcode = orgcode;
};

/**
 * 
 */
const requestSingle = (url,params,success = ()=>{},fail = ()=>{})=>{
  
}

export default {
  request,
  requestMultiple,
  setConfig,
  formRequest,
  requestSingle
};
