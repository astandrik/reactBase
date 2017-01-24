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
export const SET_ADDING_TRUD_TASK = "SET_ADDING_TRUD_TASK";
export const SELECT_TABLE_LABORS = "SELECT_TABLE_LABORS";
export const GET_WORK_CODES = "GET_WORK_CODES";
export const SET_CODES = "SET_CODES";
export const SET_FINANCES = "SET_FINANCES";
export const SET_GROUPED_TABLE_LABORS = "SET_GROUPED_TABLE_LABORS";
export const SET_LABOR_VIEW = "SET_LABOR_VIEW";
export const CLOSE_LABOR = "CLOSE_LABOR";
export const CHANGE_TREE_FILTER = "CHANGE_TREE_FILTER";

import {
    reset
} from 'redux-form';
import Task from "../../Entities/Tasks/Task";
import TaskTree from "../../Entities/Tasks/TaskTree";
import moment from "moment";
import _ from "lodash";
import Labor from "../../Entities/Tasks/Labor";
import {
    toggleRightPanel,
    closeTrudModal
} from "./layoutActions";
import {
  changeWeek,
  loadTableData
} from "./tableActions";
import {
    generateActionFunc,
    fetchAsync,
    fetchPost
} from "./actionHelper.js";

export const setAddingTrudTask = generateActionFunc(SET_ADDING_TRUD_TASK);
export const setTasks = generateActionFunc(SET_TASKS);
export const setLabor = generateActionFunc(SET_CURRRENT_LABOR);
export const setTaskView = generateActionFunc(SET_TASK_VIEW);
export const toggleTaskOpen = generateActionFunc(TOGGLE_TASK_OPEN);
export const activateTask = generateActionFunc(ACTIVATE_TASK);
export const setActiveTaskTab = generateActionFunc(SET_ACTIVE_TASK_TAB);
export const openLaborComment = generateActionFunc(OPEN_LABOR_COMMENT);
export const openDescription = generateActionFunc(OPEN_DESCRIPTION);
export const setCurrentTaskComment = generateActionFunc(SET_CURRENT_TASK_COMMENT);
export const setGroupedLabors = generateActionFunc(SET_GROUPED_LABORS);
export const setGroupedTableLabors = generateActionFunc(SET_GROUPED_TABLE_LABORS);
export const setCodes = generateActionFunc(SET_CODES);
export const setFinances = generateActionFunc(SET_FINANCES);
export const setLaborView = generateActionFunc(SET_LABOR_VIEW);
export const closeLabor= generateActionFunc(CLOSE_LABOR);
export const changeTreeFilter = generateActionFunc(CHANGE_TREE_FILTER);

export function groupLabors(labors) {
    labors.sort((a, b) => a.startDate < b.startDate ? 1 : -1);
    let groups = _.groupBy(labors, function (labor) {
        return moment(labor.startDate).startOf('day').format();
    });
    return groups;
}

export function loadTask(obj, callback) {
    const handler = function (json, dispatch, getState) {
        const task = new Task(json.data);
        task.rawExecutors = task.executors ? task.executors.map(x => ({id: x.id, name: x.name})) : [];
        task.executors = task.executors ? task.executors.map(x => ({value: x.id, label: x.name})) : [];
        dispatch(setTaskView({task, parent_id: task.parent_id || 0}));
        dispatch(toggleRightPanel({status: 1}));
        const labors = json.data.timings.map((x) => new Labor(x));
        const groups = groupLabors(labors);
        dispatch(setGroupedLabors({groups}));
        const currentWeek = getState().currentWeek;
        dispatch(loadTableData({day: currentWeek}, task.id));
        if(callback) {
          callback(task);
        }
    }
    return fetchAsync(`/get/task?id=${obj.id}`, handler);
}

export function createTask(data) {
    const handler = (json,dispatch, getState) => {
      dispatch(loadTasks());
      const currentWeek = getState().currentWeek;
      dispatch(loadTableData({day: currentWeek}, json.id))
      dispatch(reset('newTaskInfoDialogForm'));
    }
    data.start_dt = (new Date(data.startDate)).getTime() / 1000;
    return fetchPost(`/create/task`, data, handler);
}

export function editTask(data, task) {
  const handler = (json,dispatch, getState) => {
    dispatch(loadTasks());
    const currentWeek = getState().currentWeek;
    dispatch(loadTableData({day: currentWeek}, task.id))
  }
  const errorHandler = (dispatch) => {
    dispatch(loadTask(task));
    dispatch(reset("taskInfoDialogForm"));
  }
  data.start_dt = (new Date(data.startDate)).getTime() / 1000;
  return fetchPost(`/edit/task`, data, handler, errorHandler);
}



export function loadLabor(labor) {
    const handler = function (json, dispatch) {
        let labor = new Labor(json.data);
        dispatch(setLaborView({
            labor
        }));
        dispatch(toggleRightPanel({
            status: 1
        }));

    }
    return fetchAsync(`/get/time?id=${labor.id}`, handler);
}

export function createLabor(data, task) {
    const handler = (json,dispatch) => {
      dispatch(loadTask(task));
      dispatch(closeTrudModal());
      dispatch(reset('trudDialogForm'));
    }
    const errorHandler = (dispatch) => {

    }
    data.date = (new Date(data.startDate)).getTime() / 1000;
    return fetchPost(`/create/time`, data, handler, errorHandler);
}

export function editLabor(data, fromLabor) {
  const handler = (json, dispatch, getState) => {
    if(fromLabor) {
      dispatch(loadLabor(data));
      const currentWeek = getState().currentWeek;
      dispatch(loadTableData({day: currentWeek}, data.task_id));
    } else {
      dispatch(loadTask({id: data.task_id}));
    }
  }
  const errorHandler = (dispatch) => {
    dispatch(loadTask(data));
    dispatch(reset("taskInfoDialogForm"));
  }
  data.date = (new Date(data.startDate)).getTime() / 1000;
  return fetchPost('/edit/time', data, handler);
}


export function loadWorkCodes() {
    const handler = (data, dispatch) => {
        let codes = data.data.codes.map(x => ({
            label: x.value,
            value: x.id
        }));
        dispatch(setCodes({
            codes
        }));
    }
    return fetchAsync(`/data/codes`, handler);
}

export function loadFinances() {
    const handler = (data, dispatch) => {
        let finances = data.data.finances.map(x => ({
            label: x.value,
            value: x.id
        }));
        dispatch(setFinances({
            finances
        }));
    }
    return fetchAsync(`/data/finances`, handler);
}

export function loadTasks(filterValue) {
    const handler = function (json, dispatch) {
        let tasks = new TaskTree(json.data.tree);
        dispatch(setTasks({
            tasks: tasks.tree
        }));
    }
    return fetchAsync(`/data/tree`, handler);
}


export function createComment(data, task, fromLabor) {
  const handler = (json,dispatch) => {
    if(fromLabor) {
      dispatch(loadLabor({id: data.time_id}));
    } else {
      dispatch(loadTask({id: data.task_id}));
    }
  }
  const errorHandler = (dispatch) => {
    if(fromLabor) {
      dispatch(loadLabor({id: data.time_id}));
    } else {
      dispatch(loadTask({id: data.task_id}));
    }
  }
  return fetchPost(`/create/comment`, data, handler, errorHandler);
}


