/*
 * @Author: junjie.lean
 * @Date: 2019-04-16 21:01:49
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-09-09 10:32:52
 */

/**
 * @description reducer集合
 */

import { combineReducers } from "redux";
import { getXXXData_reducer, test_reducer } from "./home.reducers";

export default combineReducers({
  getXXXData_reducer,
  test_reducer
});
