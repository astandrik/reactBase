export const LOAD_TASKS = "LOAD_TASKS";
export const SET_TASKS = "SET_TASKS";
export const TOGGLE_OPEN = "TOGGLE_OPEN";
export const SET_TASK_VIEW = "SET_TASK_VIEW";
export const TOGGLE_TASK_OPEN = "TOGGLE_TASK_OPEN";
export const ACTIVATE_TASK = "ACTIVATE_TASK";
export const DEACTIVATE_TASKS = "DEACTIVATE_TASKS";
export const SET_ACTIVE_TASK_TAB = "SET_ACTIVE_TASK_TAB";
export const SET_CURRRENT_LABOR = "SET_CURRRENT_LABOR";
export const OPEN_LABOR_COMMENT = "OPEN_LABOR_COMMENT";
export const SET_GROUPED_LABORS = "SET_GROUPED_LABORS";
export const OPEN_DESCRIPTION = "OPEN_DESCRIPTION";
export const SET_CURRENT_TASK_COMMENT = "SET_CURRENT_TASK_COMMENT";

import {changeFetchingStatus} from "./layoutActions";
import Task from "../../Entities/Tasks/Task";
import moment from "moment";
import _ from "lodash";
import Labor from "../../Entities/Tasks/Labor";
import {toggleRightPanel} from "./layoutActions";
import {generateActionFunc, fetchAsync} from "./actionHelper.js";

export const setTasks = generateActionFunc(SET_TASKS);
export const setLabor = generateActionFunc(SET_CURRRENT_LABOR);
export const toggleTaskTreeOpen = generateActionFunc(TOGGLE_OPEN);
export const setTaskView = generateActionFunc(SET_TASK_VIEW);
export const toggleTaskOpen = generateActionFunc(TOGGLE_TASK_OPEN);
export const activateTask = generateActionFunc(ACTIVATE_TASK);
export const deactivateTasks = generateActionFunc(DEACTIVATE_TASKS);
export const setActiveTaskTab = generateActionFunc(SET_ACTIVE_TASK_TAB);
export const openLaborComment = generateActionFunc(OPEN_LABOR_COMMENT);
export const openDescription = generateActionFunc(OPEN_DESCRIPTION);
export const setCurrentTaskComment = generateActionFunc(SET_CURRENT_TASK_COMMENT);
export const setGroupedLabors = generateActionFunc(SET_GROUPED_LABORS);

export function loadTask(obj) {
  const handler = function(json, dispatch) {
    const task = new Task(json);
    dispatch(setTaskView({task}));
    dispatch(toggleRightPanel({status: 1}));
  }
  return fetchAsync(`http://localhost:8080/tasks/${obj.id}`, handler);
}

export function loadTasks(id) {
  const handler = function(json, dispatch) {
    const tasks = json.map((x) => new Task(x));
    dispatch(setTasks({tasks}));
  }
  return fetchAsync(`http://localhost:8080/tasks`, handler);
}

export function loadLabors(obj) {
  const handler = function(json, dispatch) {
    const labors = json.map((x) => new Labor(x));
    labors.sort((a,b) => a.startDate < b.startDate ? 1 : -1);
    let groups = _.groupBy(labors, function (labor) {
      return moment(labor.startDate).startOf('day').format();
    });
    dispatch(setLabor({labors}));
    dispatch(setGroupedLabors({groups}));
  }
  return fetchAsync(`http://localhost:8080/labor/${obj.id}`, handler);
}
