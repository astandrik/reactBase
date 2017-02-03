import {
  SET_REPORT_TASKS
} from "../actions/reportsActions";

export function setReportTasks(state = [], action) {
  switch (action.type) {
    case SET_REPORT_TASKS:
      return action.tasks;
    default:
      return state;
  }
}