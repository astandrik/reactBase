import {
    CHANGE_FETCHING_STATUS,
    TOGGLE_TOOLBAR,
    SET_TABS,
    TOGGLE_RIGHT_PANEL,
    OPEN_TRUD_MODAL,
    CLOSE_TRUD_MODAL,
    SET_CURRENT_TITLE,
    OPEN_ERRORS_MODAL,
    CLOSE_ERRORS_MODAL,
    SET_CLIENT_HEIGHT,
    CLEAR_LAYOUT,
    SET_SEARH_QUERY,
    SET_FILTERS
} from "../actions/layoutActions";

import {
  SET_GLOBAL_TASK_TYPE
} from "../actions/tasksActions";

export function fetchStatusChange(state = false, action) {
    switch (action.type) {
    case CHANGE_FETCHING_STATUS:
        return action.status
    default:
        return state;
    }
}

const defaultFilters = {
  types: ["current"],
  all_subs: 0,
  sub_ids: []
};


export function setFilters(state = defaultFilters, action) {
  switch (action.type) {
    case SET_FILTERS:
      return action.filters;
    case CLEAR_LAYOUT:
      return defaultFilters;
    default:
      return state;
  }
}


export function setClientHeight(state = 100, action) {
  switch (action.type) {
    case SET_CLIENT_HEIGHT:
      return action.height;
    default:
      return state;
  }
}

export function setTabs(state = [], action) {
    switch (action.type) {
    case SET_TABS:
        return action.tabs
    case CLEAR_LAYOUT:
        return [];
    default:
        return state
    }
}

export function openTrudModal(state = false, action) {
    switch (action.type) {
    case OPEN_TRUD_MODAL:
        return true;
    case CLOSE_TRUD_MODAL:
        return false;
    case CLEAR_LAYOUT:
        return false;
    default:
        return state;
    }
}

export function isErrorsModalOpened(state = false, action) {
  switch (action.type) {
  case OPEN_ERRORS_MODAL:
      return true;
  case CLOSE_ERRORS_MODAL:
      return false;
  case CLEAR_LAYOUT:
      return false;
  default:
      return state;
  }
}

export function setSearchQuery(state = "", action) {
  switch (action.type) {
    case SET_SEARH_QUERY:
      return action.query
    default:
      return state
  }
}

export function toggleRightPanel(state = 0, action) {
    switch (action.type) {
    case TOGGLE_RIGHT_PANEL:
        return action.status
    case CLEAR_LAYOUT:
        return 0;
    default:
        return state
    }
}

export function setGlobalTaskType(state = "all", action) {
  switch (action.type) {
    case SET_GLOBAL_TASK_TYPE:
        return action.routeType;
    case CLEAR_LAYOUT:
        return "all";
    default:
        return state;
  }
}

const typeDict = {
  "nonDistributed": "Нераспределенные задачи",
  "my": "Мои задачи",
  "subordinate": "Задачи подчинённых",
  "all" : "Все задачи"
}

export function setCurrentTitle(state = "", action) {
    switch (action.type) {
      case SET_CURRENT_TITLE:
          return action.title;
      case SET_GLOBAL_TASK_TYPE:
          return typeDict[action.routeType];
      default:
          return state;
    }
}

export function toggleToolbar(state = true, action) {
    switch (action.type) {
    case TOGGLE_TOOLBAR:
        return !state;
    default:
        return state;
    }
}
