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

const form = formReducer.plugin({
    taskInfoDialogForm: (state, action) => { // <------ 'account' is name of form given to reduxForm()
        switch (action.type) {
        case "SET_TASK_VIEW":
            return undefined; // <--- blow away form data
        default:
            return state;
        }
    }
})

export default combineReducers({
    isFetching: layoutReducers.fetchStatusChange,
    user: userReducers.userSet,
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
    form: form,
    currentAddingTrudTask: taskReducers.addingTrudTask,
    currentWeek: tableReducers.setCurrentWeek,
    codes: taskReducers.setCodes,
    currentTitle: layoutReducers.setCurrentTitle,
    subordinates: userReducers.setSubordinates,
    validationErrors: errorReducers.setValidationErrors,
    isErrorsModalOpen: layoutReducers.isErrorsModalOpened
})
