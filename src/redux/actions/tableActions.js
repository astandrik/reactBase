import {generateActionFunc, fetchAsync} from "./actionHelper.js";
import TableData from "../../Entities/Table/TableData";


export const GET_TABLE_DATA = "GET_TABLE_DATA";

export const setTableData = generateActionFunc(GET_TABLE_DATA);


export function loadTableData() {
  const handler = function(json, dispatch) {
    const tableData = new TableData(json);
    dispatch(setTableData({tableData}));
  }
  return fetchAsync(`http://localhost:8080/tableTasks`, handler);
}

