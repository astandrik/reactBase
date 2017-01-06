import {
    CHANGE_FETCHING_STATUS,
    TOGGLE_TOOLBAR,
    SET_TABS,
    TOGGLE_RIGHT_PANEL,
    OPEN_TRUD_MODAL,
    CLOSE_TRUD_MODAL,
    SET_CURRENT_TITLE,
    OPEN_ERRORS_MODAL,
    CLOSE_ERRORS_MODAL
} from "../actions/layoutActions";

export function fetchStatusChange(state = false, action) {
    switch (action.type) {
    case CHANGE_FETCHING_STATUS:
        return action.status
    default:
        return state;
    }
}

export function setTabs(state = [], action) {
    switch (action.type) {
    case SET_TABS:
        return action.tabs
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
  default:
      return state;
  }
}

export function toggleRightPanel(state = 0, action) {
    switch (action.type) {
    case TOGGLE_RIGHT_PANEL:
        return action.status
    default:
        return state
    }
}


export function setCurrentTitle(state = "", action) {
    switch (action.type) {
    case SET_CURRENT_TITLE:
        return action.title;
    default:
        return state;
    }
}

export function toggleToolbar(state = false, action) {
    switch (action.type) {
    case TOGGLE_TOOLBAR:
        return action.status
    default:
        return state;
    }
}
