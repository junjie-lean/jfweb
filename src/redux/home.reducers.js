/*
 * @Author: junjie.lean
 * @Date: 2019-08-23 13:28:06
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-02 16:35:01
 */

/**
 * @description reducer示例
 */

import { getData, getUser } from "../request/home.request";

let init = {};

export const getXXXData_action = async (bbb) => {
  let data;
  if(bbb==1){
    data = await getData()
  }else{
    data =await getUser();
  }

 
  //data = sdadasdasasdasdasd
   
  if(data.result == 'ok'){
    return dispatch => {
      dispatch({
        type: "GETXXXDATA",
        data
      });
    };
  }
  else{
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
