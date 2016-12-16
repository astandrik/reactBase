import {CHANGE_FETCHING_STATUS,
  SET_USER,
  TOGGLE_TOOLBAR,
  SET_TABS,
  TOGGLE_RIGHT_PANEL,
OPEN_TRUD_MODAL,
CLOSE_TRUD_MODAL} from  "../actions/layoutActions";

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

export function toggleRightPanel(state = 0, action) {
  switch (action.type) {
    case TOGGLE_RIGHT_PANEL:
      return action.status
    default:
      return state
  }
}

export function userSet(state = {name: 'None', position: 'Никто'}, action) {
  switch (action.type) {
    case SET_USER:
      return {
        name: action.user.name,
        position: action.user.position
      };
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