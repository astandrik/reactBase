import {
    combineReducers
} from 'redux';
import * as taskReducers from "./reducers/Task";
import * as layoutReducers from "./reducers/Layout";
import * as tableReducers from "./reducers/Table";
import * as userReducers from "./reducers/User";
import * as errorReducers from "./reducers/Errors";
import {
    reducer as formReducer
} from 'redux-form';

const taskBindings = {
  tasks: taskReducers.setTasks,
  taskView: taskReducers.setTaskView,
  laborView: taskReducers.setLaborView,
  activeTaskTab: taskReducers.setActiveTaskTab,
  groupedLabors: taskReducers.setGroupedLabors,
  groupedTableLabors: taskReducers.setGroupedTableLabors,
  currentTaskComment: taskReducers.setCurrentTaskComment,
  currentAddingTrudTask: taskReducers.addingTrudTask,
  codes: taskReducers.setCodes,
  finances: taskReducers.setFinances,
  activeIndexes: taskReducers.setActiveIndexes,
  openedTasks: taskReducers.setOpenedTasks,
}

const layoutBindings = {
    isFetching: layoutReducers.fetchStatusChange,
    showNav: layoutReducers.toggleToolbar,
    tabs: layoutReducers.setTabs,
    rightPanelStatus: layoutReducers.toggleRightPanel,
    isTrudModalOpen: layoutReducers.openTrudModal,
    currentTitle: layoutReducers.setCurrentTitle,
    isErrorsModalOpen: layoutReducers.isErrorsModalOpened,
    globalTaskType: layoutReducers.setGlobalTaskType,
    clientHeight: layoutReducers.setClientHeight,
    searchQuery: layoutReducers.setSearchQuery,
    currentTaskFilters: layoutReducers.setFilters
}

const tableBindings = {
    tableData: tableReducers.setTableData,
    currentWeek: tableReducers.setCurrentWeek,
    currentDay: tableReducers.setCurrentDay,
}

const userBindings = {
    user: userReducers.userSet,
    subordinates: userReducers.setSubordinates,
    pingedUser: userReducers.setPingedUser
}

export default combineReducers({
    ...taskBindings,
    ...layoutBindings,
    ...tableBindings,
    ...userBindings,
    form: formReducer,
    validationErrors: errorReducers.setValidationErrors
})
