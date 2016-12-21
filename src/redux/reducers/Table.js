import {
  GET_TABLE_DATA
} from "../actions/tableActions";

export function setTableData(state = [], action) {
  switch (action.type) {
    case GET_TABLE_DATA:
      return action.tableData
    default:
      return state
  }
}
