export const TOGGLE_TOOLBAR = "TOGGLE_TOOLBAR";
export const SET_TABS = "SET_TABS";
export const TOGGLE_RIGHT_PANEL = "TOGGLE_RIGHT_PANEL";
export const OPEN_TRUD_MODAL = "OPEN_TRUD_MODAL";
export const CHANGE_FETCHING_STATUS = "CHANGE_FETCHING_STATUS";
export const CLOSE_TRUD_MODAL = "CLOSE_TRUD_MODAL";
export const SET_CURRENT_TITLE = "SET_CURRENT_TITLE";
export const OPEN_ERRORS_MODAL = "OPEN_ERRORS_MODAL";
export const CLOSE_ERRORS_MODAL = "CLOSE_ERRORS_MODAL";
import {
    generateActionFunc 
} from "./actionHelper.js";

export const toggleToolbar = generateActionFunc(TOGGLE_TOOLBAR);
export const setTabs = generateActionFunc(SET_TABS);
export const setCurrentTitle = generateActionFunc(SET_CURRENT_TITLE);
export const toggleRightPanel = generateActionFunc(TOGGLE_RIGHT_PANEL);
export const openTrudModal = generateActionFunc(OPEN_TRUD_MODAL);
export const closeTrudModal = generateActionFunc(CLOSE_TRUD_MODAL);
export const openErrorsModal = generateActionFunc(OPEN_ERRORS_MODAL);
export const closeErrorsModal = generateActionFunc(CLOSE_ERRORS_MODAL);