export const SET_USER = "SET_USER";
export const TOGGLE_TOOLBAR = "TOGGLE_TOOLBAR";
export const SET_TABS = "SET_TABS";
export const TOGGLE_RIGHT_PANEL = "TOGGLE_RIGHT_PANEL";
export const OPEN_TRUD_MODAL = "OPEN_TRUD_MODAL";
export const CHANGE_FETCHING_STATUS = "CHANGE_FETCHING_STATUS";
export const CLOSE_TRUD_MODAL = "CLOSE_TRUD_MODAL";
import {generateActionFunc,fetchAsync} from "./actionHelper.js";

export const setLoggedUser = generateActionFunc(SET_USER);
export const toggleToolbar = generateActionFunc(TOGGLE_TOOLBAR);
export const setTabs = generateActionFunc(SET_TABS);
export const toggleRightPanel = generateActionFunc(TOGGLE_RIGHT_PANEL);
export const openTrudModal = generateActionFunc(OPEN_TRUD_MODAL);
export const closeTrudModal = generateActionFunc(CLOSE_TRUD_MODAL);

export function getCurrentUser() {
  const handler = function(json,dispatch) {
    const data = json.data.user;
    const user = {
        name: data.name,
        position: data.position
      };
    dispatch(setLoggedUser({user}));
  }
  return fetchAsync(`/data/me`, handler);
}
