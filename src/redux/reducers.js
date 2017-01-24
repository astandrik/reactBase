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


export default combineReducers({
    isFetching: layoutReducers.fetchStatusChange,
    user: userReducers.userSet,
    showNav: layoutReducers.toggleToolbar,
    tasks: taskReducers.setTasks,
    tabs: layoutReducers.setTabs,
    taskView: taskReducers.setTaskView,
    laborView: taskReducers.setLaborView,
    rightPanelStatus: layoutReducers.toggleRightPanel,
    activeTaskTab: taskReducers.setActiveTaskTab,
    groupedLabors: taskReducers.setGroupedLabors,
    groupedTableLabors: taskReducers.setGroupedTableLabors,
    currentTaskComment: taskReducers.setCurrentTaskComment,
    isTrudModalOpen: layoutReducers.openTrudModal,
    tableData: tableReducers.setTableData,
    form: formReducer,
    currentAddingTrudTask: taskReducers.addingTrudTask,
    currentWeek: tableReducers.setCurrentWeek,
    currentDay: tableReducers.setCurrentDay,
    codes: taskReducers.setCodes,
    finances: taskReducers.setFinances,
    currentTitle: layoutReducers.setCurrentTitle,
    subordinates: userReducers.setSubordinates,
    validationErrors: errorReducers.setValidationErrors,
    isErrorsModalOpen: layoutReducers.isErrorsModalOpened,
    treeFilter: taskReducers.changeTreeFilter,
    activeIndexes: taskReducers.setActiveIndexes,
    openedTasks: taskReducers.setOpenedTasks
})
