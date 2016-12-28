import {
  GET_TABLE_DATA,
  SET_WEEK
} from "../actions/tableActions";

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

const monday = getMonday(new Date());;

export function setTableData(state = [], action) {
  switch (action.type) {
    case GET_TABLE_DATA:
      return action.tableData
    default:
      return state
  }
}

export function setCurrentWeek(state = monday, action) {
  switch (action.type) {
    case SET_WEEK:
      return getMonday(action.day);
    default:
      return state
  }
}
