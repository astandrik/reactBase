import {SET_TASKS,
  TOGGLE_OPEN,
  TOGGLE_TASK_OPEN,
  ACTIVATE_TASK,DEACTIVATE_TASKS,
  SET_TASK_VIEW,
  SET_ACTIVE_TASK_TAB,
  OPEN_LABOR_COMMENT,
  SET_CURRRENT_LABOR,
  OPEN_DESCRIPTION,
  SET_GROUPED_LABORS,
  SET_CURRENT_TASK_COMMENT,
  SET_ADDING_TRUD_TASK,
  SET_CODES} from "../actions/tasksActions";


function findTaskInTreeById(tasks,id) {
  let elem = -1;
  for(var i = 0; i < tasks.length; i++) {
    if(tasks[i].id === id) {
      elem = tasks[i];
      break;
    }
    if(tasks[i].children) {
      elem = findTaskInTreeById(tasks[i].children, id);
      if(elem !== -1) {
        break;
      }
    }
  }
  return elem;
}



function findLaborById(labors, id) {
  let elem = -1;
  for(var i = 0; i < labors.length; i++) {
    if(labors[i].id === id) {
      elem = labors[i];
      break;
    }
  }
  return elem;
}


function deactivateTasks(tasks) {
  for(var i = 0; i < tasks.length; i++) {
    tasks[i].active = false;
    if(tasks[i].children) {
      deactivateTasks(tasks[i].children);
    }
  }
}

export function addingTrudTask(state = {}, action) {
  switch (action.type) {
    case SET_ADDING_TRUD_TASK:
        return action.task;
    default:
        return state;
  }
}

export function setCodes(state = [], action) {
  switch (action.type) {
    case SET_CODES:
      return action.codes;
    default:
      return state;
  }
}

export function setCurrentTaskComment(state = "", action) {
  switch (action.type) {
    case SET_CURRENT_TASK_COMMENT:
      return action.text
    default:
      return state;
  }

}

export function setTaskView(state = false, action) {
  switch (action.type) {
    case SET_TASK_VIEW:
      return action.task;
    case OPEN_DESCRIPTION:
      action.task.descriptionOpen = true;
      return JSON.parse(JSON.stringify(state));
    default:
      return state;
  }
}

export function setActiveTaskTab(state = "trud", action) {
  switch (action.type) {
    case SET_ACTIVE_TASK_TAB:
      return action.value;
    default:
      return state;
  }
}

export function setGroupedLabors(state = [], action) {
  switch (action.type) {
    case SET_GROUPED_LABORS:
      return action.groups;
    case OPEN_LABOR_COMMENT:
      const keys = Object.keys(state);
      for(var i = 0; i < keys.length; i++) {
        let labor = findLaborById(state[keys[i]], action.id);
        if(labor !== -1) {
          labor.commentsOpened = !labor.commentsOpened;
        }
      }
      return JSON.parse(JSON.stringify(state));
    default:
      return state;
  }
}

export function setCurrentLabors(state= {}, action) {
  switch (action.type) {
    case SET_CURRRENT_LABOR:
      return action.labors;

    default:
      return state;
  }
}

export function setTasks(state = [], action) {
  switch (action.type) {
    case SET_TASKS:
      return action.tasks
    case TOGGLE_TASK_OPEN:
      let item = findTaskInTreeById(state, action.id);
      item.opened = !item.opened;
      return JSON.parse(JSON.stringify(state));
    case ACTIVATE_TASK:
      deactivateTasks(state);
      let item_ = findTaskInTreeById(state, action.id);
      item_.active = true;
      return JSON.parse(JSON.stringify(state));
    case DEACTIVATE_TASKS:
      deactivateTasks(state);
      return JSON.parse(JSON.stringify(state));
    default:
      return state;
  }
}

export function toggleTaskOpen(state = [0,0,0], action) {
  switch (action.type) {
    case TOGGLE_OPEN:
      let new_arr = state.slice();
      new_arr[action.index] = !new_arr[action.index];
      return new_arr;
    default:
      return state;
  }
}

