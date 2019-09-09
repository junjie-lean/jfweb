/*
 * @Author: junjie.lean
 * @Date: 2019-08-23 13:28:06
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-06 17:25:25
 */

/**
 * @description reducer示例
 */

import { getData } from "../request/home.request";

let init = {};

export const getXXXData_action = async () => {
  let data = await getData();
  console.log(data);
  if (data.result == "ok") {
    return dispatch => {
      dispatch({
        type: "GETXXXDATA",
        data
      });
    };
  } else {
    return dispatch => {
      dispatch({
        type: "GETXXXDATA",
        data
      });
    };
  }
};

export const getXXXData_reducer = (state = init, action) => {
  switch (action.type) {
    case "getXXXDATA": {
      return {
        ...state,
        ...action.data
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
// export { getXXXData_action, getXXXData_reducer };
