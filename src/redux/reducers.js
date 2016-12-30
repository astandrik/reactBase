import { combineReducers } from 'redux';
import * as taskReducers from "./reducers/Task";
import * as layoutReducers from "./reducers/Layout";
import * as tableReducers from "./reducers/Table";
import { reducer as formReducer } from 'redux-form';


export default combineReducers({
  isFetching: layoutReducers.fetchStatusChange,
  user: layoutReducers.userSet,
  showNav: layoutReducers.toggleToolbar,
  tasks: taskReducers.setTasks,
  tabs: layoutReducers.setTabs,
  taskView: taskReducers.setTaskView,
  tasksOpened: taskReducers.toggleTaskOpen,
  rightPanelStatus: layoutReducers.toggleRightPanel,
  activeTaskTab: taskReducers.setActiveTaskTab,
  groupedLabors: taskReducers.setGroupedLabors,
  currentTaskComment: taskReducers.setCurrentTaskComment,
  isTrudModalOpen: layoutReducers.openTrudModal,
  tableData: tableReducers.setTableData,
  form: formReducer,
  currentAddingTrudTask: taskReducers.addingTrudTask,
  currentWeek: tableReducers.setCurrentWeek,
  codes: taskReducers.setCodes
})