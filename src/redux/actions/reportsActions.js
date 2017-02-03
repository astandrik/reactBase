export const SET_REPORT_TASKS = "SET_REPORT_TASKS";
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



export const setReportTasks = generateActionFunc(SET_REPORT_TASKS);

export function getUserTasks(user_ids) {
  const handler = (json, dispatch, getState) => {
    dispatch(setReportTasks({tasks: json.data.tasks.map(x => ({value: x.id, label: x.name}))}));
  }
  return fetchAsync("/data/tasklist", handler);
}

export function createTasksReport(obj) {
  return (dispatch, getState) => {
      const handler = (json, dispatch, getState) => {
        debugger;
      }
      const day = getState().Table.currentWeek;
      const range = getDateRange(day);
      const date_from = Math.floor((+range.first)/1000);
      const date_to = Math.floor((+range.last)/1000);
      const user_ids = (obj.user_ids && obj.user_ids.length>0) ? obj.user_ids.join(",") : undefined;
      const task_ids = (obj.task_ids && obj.task_ids.length>0) ? obj.task_ids.join(","): undefined;
      let par = {
        date_to,
        date_from,
        user_ids,
        task_ids
      };
      let paramArr = [];
      for(var e in par) {
        if(par[e]) {
          paramArr.push(`${e}=${par[e]}`);
        }
      }
      dispatch(fetchAsync(`/report/tasks?${paramArr.join("&")}`, handler));
  }
}

export function createFinanceReport(obj) {
  return (dispatch, getState) => {
      const handler = (json, dispatch, getState) => {
        debugger;
      }
      const day = getState().Table.currentWeek;
      const range = getDateRange(day);
      const date_from = Math.floor((+range.first)/1000);
      const date_to = Math.floor((+range.last)/1000);
      const user_ids = (obj.user_ids && obj.user_ids.length>0) ? obj.user_ids.join(",") : undefined;
      const finance_ids = (obj.finance_ids && obj.finance_ids.length>0) ? obj.finance_ids.join(","): undefined;
      let par = {
        date_to,
        date_from,
        user_ids,
        finance_ids
      };
      let paramArr = [];
      for(var e in par) {
        if(par[e]) {
          paramArr.push(`${e}=${par[e]}`);
        }
      }
      dispatch(fetchAsync(`/report/finance?${paramArr.join("&")}`, handler));
  }
}

export function createUserReport(obj) {
  return (dispatch, getState) => {
      const handler = (json, dispatch, getState) => {
        debugger;
      }
      const day = getState().Table.currentWeek;
      const range = getDateMonthRange(day);
      debugger;
      const date_from = Math.floor((+range.first)/1000);
      const date_to = Math.floor((+range.last)/1000);
      const id = obj.user_id;
      let par = {
        date_to,
        date_from,
        id
      };
      let paramArr = [];
      for(var e in par) {
        if(par[e]) {
          paramArr.push(`${e}=${par[e]}`);
        }
      }
      dispatch(fetchAsync(`/report/user?${paramArr.join("&")}`, handler));
  }
}

