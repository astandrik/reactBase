import {
    generateActionFunc
} from "./actionHelper.js";
import {
    fetchAsync,
    fetchPost
} from "./actionHelper.js";
import {
  getDateRange,
  getDateMonthRange
} from "./tableActions";

export const SET_PIE = "SET_PIE";
export const SET_BAR = "SET_BAR";
export const SET_PERIOD = "SET_PERIOD";
export const SET_WEEK_PERIOD = "SET_WEEK_PERIOD";
export const SET_DAY_PERIOD = "SET_DAY_PERIOD";
export const SET_MONTH_PERIOD = "SET_MONTH_PERIOD";


export const setPie = generateActionFunc(SET_PIE);
export const setBar = generateActionFunc(SET_BAR);
export const setPeriod = generateActionFunc(SET_PERIOD);
export const setWeekPeriod = generateActionFunc(SET_WEEK_PERIOD);
export const setDayPeriod = generateActionFunc(SET_DAY_PERIOD);
export const setMonthPeriod = generateActionFunc(SET_MONTH_PERIOD);

export function loadHisto(obj) {
  return (dispatch, getState) => {

    const handler = (json, dispatch, getState) => {
      dispatch(setBar({bar: json.data}));
    }
    let day1 = 0;
    let day2 = 1;
    let date_from = 0;
    let date_to = 1;
    const period = getState().Statistics.period;
    if(period === 1) {
      day1 = getState().Statistics.dayPeriod.first;
      day2 = getState().Statistics.dayPeriod.last;
      date_from = Math.floor((+day1 + 1000*60*60*5)/1000);
      date_to = Math.floor((+day2 + 1000*60*60*5)/1000);
    } else if(period === 3) {
      day1 = getState().Statistics.monthPeriod.first;
      day2 = getState().Statistics.monthPeriod.last;
      date_from = Math.floor((+day1 + 1000*60*60*5)/1000);
      date_to = Math.floor((+day2 + 1000*60*60*5)/1000);
    }
    else {
      day1 = getState().Statistics.weekPeriod.first;
      day2 = getState().Statistics.weekPeriod.last;
      date_from = Math.floor((+day1 + 1000*60*60*24*7)/1000);
      date_to = Math.floor((+day2 + 1000*60*60*24)/1000);
    }
    const user_ids = (obj.user_ids && obj.user_ids.length>0) ? obj.user_ids.join(",") : undefined;
    const code_ids = (obj.code_ids && obj.code_ids.length>0) ? obj.code_ids.join(","): undefined;
    const task_ids = (obj.task_ids && obj.task_ids.length>0) ? obj.task_ids.join(","): undefined;
    const type = obj.type;
    let par = {
      date_to,
      date_from,
      user_ids,
      code_ids,
      task_ids,
      type,
      period
    };
    let paramArr = [];
    for(var e in par) {
      if(par[e]) {
        paramArr.push(`${e}=${par[e]}`);
      }
    }
    dispatch(fetchAsync(`/stat/bar?${paramArr.join("&")}`, handler));
  }
}

export function loadPie(obj) {
  return (dispatch, getState) => {

    const handler = (json, dispatch, getState) => {
      dispatch(setPie({pie: json.data}));
    }
    const day1 = getState().Statistics.weekPeriod.first;
    const day2 = getState().Statistics.weekPeriod.last;
    const date_from = Math.floor((+day1 + 1000*60*60*24*7)/1000);
    const date_to = Math.floor((+day2 + 1000*60*60*24)/1000);
    const user_ids = (obj.user_ids && obj.user_ids.length>0) ? obj.user_ids.join(",") : undefined;
    const code_ids = (obj.code_ids && obj.code_ids.length>0) ? obj.code_ids.join(","): undefined;
    const task_ids = (obj.task_ids && obj.task_ids.length>0) ? obj.task_ids.join(","): undefined;
    const type = obj.type;
    let par = {
      date_to,
      date_from,
      user_ids,
      code_ids,
      task_ids,
      type
    };
    let paramArr = [];
    for(var e in par) {
      if(par[e]) {
        paramArr.push(`${e}=${par[e]}`);
      }
    }
    dispatch(fetchAsync(`/stat/pie?${paramArr.join("&")}`, handler));
  }
}