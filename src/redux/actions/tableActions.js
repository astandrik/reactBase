import {generateActionFunc, fetchAsync} from "./actionHelper.js";
import TableData from "../../Entities/Table/TableData";

export const GET_TABLE_DATA = "GET_TABLE_DATA";
export const CHANGE_WEEK = "CHANGE_WEEK";
export const SET_WEEK = "SET_WEEK";

export function getDateRange(day) {
  var curr = new Date(day); // get current date
  var curr2 = new Date(day); // get current date
  var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first));
  firstday.setHours(0,0,0,0);
  var lastday = new Date(curr2.setDate(last));
  lastday.setHours(23,59,59,999);
  return {first: firstday, last: lastday};
}


export const setTableData = generateActionFunc(GET_TABLE_DATA);
export const setCurrentWeek = generateActionFunc(SET_WEEK);

export function changeWeek(obj) {
  const range = getDateRange(obj.day);
  const handler = function(json, dispatch, getState) {
    const tableData = new TableData(json, range.first, range.last, getState().user);
    dispatch(setTableData({tableData}));
  }
  return fetchAsync(`/data/tasks?date_from=${ Math.floor((+range.first)/1000)}&date_to=${Math.floor((+range.last)/1000)}`, handler);
}


export function loadTableData(obj) {
  const range = getDateRange(obj.day);
  const handler = function(json, dispatch, getState) {
    const tableData = new TableData(json, range.first, range.last, getState().user);
    dispatch(setTableData({tableData}));
  }
  return fetchAsync(`/data/tasks?date_from=${ Math.floor((+range.first)/1000)}&date_to=${Math.floor((+range.last)/1000)}`, handler);
}

