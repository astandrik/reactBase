export const TOGGLE_TOOLBAR = "TOGGLE_TOOLBAR";
export const SET_TABS = "SET_TABS";
export const TOGGLE_RIGHT_PANEL = "TOGGLE_RIGHT_PANEL";
export const OPEN_TRUD_MODAL = "OPEN_TRUD_MODAL";
export const CHANGE_FETCHING_STATUS = "CHANGE_FETCHING_STATUS";
export const CLOSE_TRUD_MODAL = "CLOSE_TRUD_MODAL";
export const SET_CURRENT_TITLE = "SET_CURRENT_TITLE";
export const OPEN_ERRORS_MODAL = "OPEN_ERRORS_MODAL";
export const CLOSE_ERRORS_MODAL = "CLOSE_ERRORS_MODAL";
export const SET_CLIENT_HEIGHT = "SET_CLIENT_HEIGHT";
export const CLEAR_LAYOUT = "CLEAR_LAYOUT";
export const SET_FILTERS = "SET_FILTERS";
export const SET_SEARH_QUERY = "SET_SEARH_QUERY";
export const SET_LOCATION = "SET_LOCATION";
import {
    generateActionFunc
} from "./actionHelper.js";

export const clearLayout = generateActionFunc(CLEAR_LAYOUT);
export const toggleToolbar = generateActionFunc(TOGGLE_TOOLBAR);
export const setTabs = generateActionFunc(SET_TABS);
export const setCurrentTitle = generateActionFunc(SET_CURRENT_TITLE);
export const toggleRightPanel = generateActionFunc(TOGGLE_RIGHT_PANEL);
export const openTrudModal = generateActionFunc(OPEN_TRUD_MODAL);
export const closeTrudModal = generateActionFunc(CLOSE_TRUD_MODAL);
export const openErrorsModal = generateActionFunc(OPEN_ERRORS_MODAL);
export const closeErrorsModal = generateActionFunc(CLOSE_ERRORS_MODAL);
export const setClientHeight = generateActionFunc(SET_CLIENT_HEIGHT);
export const setSearchQuery = generateActionFunc(SET_SEARH_QUERY);
export const setFilters = generateActionFunc(SET_FILTERS);
export const setLocation = generateActionFunc(SET_LOCATION);