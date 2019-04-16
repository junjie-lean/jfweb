/*
 * @Author: junjie.lean
 * @Date: 2019-04-16 12:59:32
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-16 13:23:10
 */

/**
 * @description 整理之前的_x通用工具集,并对部分方法重新封装
 */

import _ from "lodash";

/************************************ URL相关 ************************************/

/**
 *
 * @param { String } name
 * @scene browser
 * @description 从URL中获取指定参数
 * @returns 指定参数
 */
const getQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let w = window.location.href.slice(window.location.href.indexOf("/"));
  var r = w.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

/**
 *
 * @param { Object } pr
 * @scene browser
 * @description 新开新标签页面的跳转方法
 * @returns false
 */
const goWith = (pr = { to: "index", with: [] }) => {
  let url = window.location.href;
  let href = url.slice(0, url.indexOf("#") + 2);
  console.log(href);
  href += pr.to + "/" + pr.with.join("/");
  window.open(href);
  return false;
};

/************************************ 数字类型 ************************************/

/**
 * @param   {Number} number      需要转换的数字
 * @param   {Boolean} bIsCapital 是否中文大写
 * @description 将数字转换成中文文本
 * @returns {String}  转换后的字符串
 */
const toChinese = (number, bIsCapital) => {
  var str = number + "";
  var len = str.length - 1;
  var idxs = [
    "",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿"
  ];
  var num;
  if (bIsCapital) {
    num = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  } else {
    num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  }
  return str.replace(/([1-9]|0+)/g, function($, $1, idx, full) {
    var pos = 0;
    if ($1[0] !== "0") {
      pos = len - idx;
      if (idx === 0 && $1[0] === 1 && idxs[pos] === "十") {
        return idxs[pos];
      }
      return num[$1[0]] + idxs[pos];
    } else {
      var left = len - idx;
      var right = left + $1.length;
      if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
        pos = left - (left % 4);
      }
      if (pos) {
        return idxs[pos] + num[$1[0]];
      } else if (idx + $1.length >= len) {
        return "";
      } else {
        return num[$1[0]];
      }
    }
  });
};
/**
 * @param   {Number} number    需要转换的数字
 * @param   {Boolean} baseUnit 基准单位，默认为K
 * @description 格式化字节大小字符串（精确到小数点后两位）
 * @returns {String}  转换后的字符串
 */
const formatSize = (number, baseUnit) => {
  baseUnit = baseUnit || "";
  baseUnit = baseUnit.toUpperCase();
  var units = ["", "K", "M", "G", "T"],
    cnt = 0,
    size = number,
    index = 0;
  while (size > 1024) {
    size = size / 1024;
    cnt++;
  }
  units.forEach((item, idx) => {
    if (item === baseUnit) {
      index = idx;
    }
  });
  return size.toFixed(2) + units[index + cnt] + "B";
};

/**
 * @param { Number } point
 * @description 星星评分显示
 */
const formatPoint = point => {
  let tmp = point + "";
  if (tmp.length == 1) {
    tmp += ".01";
  } else if (tmp.length == 3) {
    tmp += "1";
  }
  let cc = tmp.slice(0, 1);
  let rate = tmp.slice(2, 4);
  if (rate >= 75) {
    return cc - 0 + 1;
  } else if (rate >= 25 && rate < 75) {
    return cc + ".5" - 0;
  } else {
    return cc - 0;
  }
};

/**
 * @param { String }
 * @description 文件大小转换 数字类型原型方法
 */
Number.prototype.formatSize = baseUnit => {
  baseUnit = baseUnit || "K";
  baseUnit = baseUnit.toUpperCase();
  var units = ["K", "M", "G", "T"],
    cnt = 0,
    size = this,
    index = 0;
  while (size > 1024) {
    size = size / 1024;
    cnt++;
  }
  units.forEach(function(item, idx) {
    if (item === baseUnit) {
      index = idx;
    }
  });
  return size.toFixed(1) + units[index + cnt] + "B";
};

/************************************ Date类型 ************************************/

/**
 * @param   {Date} date         指定日期
 * @param   {Number} nYear      开始计算的年份，默认为当前日期值所在年份
 * @param   {Number} nWeekStart 每周开始为周几，默认为周一
 * @returns {Number} 总周数
 * @description 获取从某一年开始计算到指定日期值的周数
 */
const getWeekFromYear = (date, nYear, nWeekStart) => {
  nWeekStart = (nWeekStart || 1) - 0;
  if (isNaN(nWeekStart) || nWeekStart > 6) nWeekStart = 1;
  if (!nYear) {
    nYear = date.getFullYear();
  }
  var dFirstDay = new Date(nYear, 0, 1);
  var nFirstWeekDays = 7 - dFirstDay.getDay() + nWeekStart;
  var nDayOfYear =
    (new Date(date.getFullYear(), date.getMonth(), date.getDate()) -
      dFirstDay) /
      (24 * 3600 * 1000) +
    1;
  return Math.ceil((nDayOfYear - nFirstWeekDays) / 7) + 1;
};

/**
 * 获取指定日期在本月的周数
 * @param   {Date} date         指定日期
 * @param   {Number} nWeekStart 每周开始为周几，默认为周一, 可选值1到7
 * @returns {Number} 总周数
 */
export const getWeekFromMonth = function(date, nWeekStart) {
  nWeekStart = (nWeekStart || 1) % 7;
  if (isNaN(nWeekStart) || nWeekStart > 7) nWeekStart = 1;
  var dFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var nFirstWeekDays = 7 - dFirstDay.getDay() + nWeekStart;
  var nDayOfYear =
    (new Date(date.getFullYear(), date.getMonth(), date.getDate()) -
      dFirstDay) /
      (24 * 3600 * 1000) +
    1;
  return Math.ceil((nDayOfYear - nFirstWeekDays) / 7) + 1;
};

/**
 * @param   {Date} date         指定日期
 * @param   {Number} nWeekStart 每周开始为周几，默认为周一, 可选值1到7
 * @returns {Date}
 * @description 获取指定时间所在周的第一天日期
 */
const getWeekStart = (date, nWeekStart) => {
  nWeekStart = (nWeekStart || 1) % 7;
  if (isNaN(nWeekStart) || nWeekStart > 7) nWeekStart = 1;
  var ndate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  ndate.setDate(date.getDate() - date.getDay() + nWeekStart);
  return ndate;
};

/**
 * @param   {Date} date         指定日期
 * @returns {Number}
 * @description 获取指定时间所在月的天数
 */
const getMonthDays = date => {
  var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.getDate();
};

/**
 * @param   {Date} date         指定日期
 * @param   {String} [sFmt='yyyy-MM-dd HH:mm:ss'] 输出的日期时间格式 默认值为'yyyy-MM-dd HH:mm:ss'
 * @returns {String} 格式化后的字符串
 * @description 日期时间格式化
 */
const formatDate = (date, sFmt) => {
  sFmt = sFmt || "yyyy-MM-dd HH:mm:ss";
  var aWeekDay = ["日", "一", "二", "三", "四", "五", "六"],
    obj = {
      y: date.getFullYear(), // 年份，注意必须用getFullYear
      M: date.getMonth() + 1, // 月份，注意是从0-11
      d: date.getDate(), // 日期
      q: Math.floor((date.getMonth() + 3) / 3), // 季度
      w: date.getDay(), // 星期，注意是0-6
      H: date.getHours(), // 24小时制
      h: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
      m: date.getMinutes(), // 分钟
      s: date.getSeconds(), // 秒
      S: date.getMilliseconds() // 毫秒
    };
  const replacefun = m => {
    var val = String(obj[i]);
    if (i === "w") return (m.length > 2 ? "星期" : "周") + aWeekDay[val];
    val = _.padStart(val, m.length, "0");
    return m.length === 1 ? val : val.substring(val.length - m.length);
  };
  for (var i in obj) {
    sFmt = sFmt.replace(new RegExp(i + "+", "g"), replacefun);
  }

  return sFmt;
};

/**
 *
 * @param {Number} sec
 * @description
 */
const formatSec = sec => {
  let time;
  if (!sec) {
    time = "00'" + '00"';
  } else if (sec < 10) {
    time = "00'0" + sec + '"';
  } else if (sec >= 10 && sec < 60) {
    time = "00'" + sec + '"';
  } else {
    let rem = sec / 60;
    if (Math.floor(rem) !== rem) {
      rem = sec - parseInt(sec / 60) * 60;
      if (rem < 10) {
        time = parseInt(sec / 60) + "'0" + rem + '"';
      } else {
        time = parseInt(sec / 60) + "'" + rem + '"';
      }
    } else {
      time = parseInt(sec / 60) + "'" + '00"';
    }
  }
  return time;
};

/**
 * @param {Number} sec
 * @description 秒数转化成分钟
 */
const formatMin = sec => {
  let time;
  if (sec && sec < 60) {
    time = 1;
  } else {
    let rem = sec / 60;
    if (Math.floor(rem) !== rem) {
      time = parseInt(rem) + 1;
    } else {
      time = parseInt(rem);
    }
  }
  return time;
};

/**
 *
 * @param {String} 开始时间 09:12:00
 * @param {String} 结束时间
 * @description 计算时间长度
 */
const TimeLength = (start, end) => {
  let starts = start.split(":");
  let ends = end.split(":");
  let startLong =
    Number(starts[0]) * 60 * 60 * 1000 +
    Number(starts[1]) * 60 * 1000 +
    Number(starts[2]) * 1000;
  let endLong =
    Number(ends[0]) * 60 * 60 * 1000 +
    Number(ends[1]) * 60 * 1000 +
    Number(ends[2]) * 1000;
  let result = endLong - startLong;
  return result > 0 ? result : 0;
};

export default {
  getQueryString,
  goWith,
  toChinese,
  formatSize,
  formatPoint,
  TimeLength,
  formatMin,
  formatSec,
  formatDate,
  getMonthDays,
  getWeekStart,
  getWeekFromYear
};
