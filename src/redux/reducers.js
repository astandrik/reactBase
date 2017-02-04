import {
    combineReducers
} from 'redux';
import * as taskReducers from "./reducers/Task";
import * as layoutReducers from "./reducers/Layout";
import * as tableReducers from "./reducers/Table";
import * as userReducers from "./reducers/User";
import * as errorReducers from "./reducers/Errors";
import * as reportsReducers from "./reducers/Report";
import * as departmentReducers from "./reducers/Admin/Department";
import * as usersReducers from "./reducers/Admin/Users";
import * as financesReducers from "./reducers/Admin/Finances";
import * as codesReducers from "./reducers/Admin/Codes";
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
    currentTaskFilters: layoutReducers.setFilters,
    defaultFilters: taskReducers.setDefaultFilters,
    currentLocation: layoutReducers.setLocation
}

const Reports = combineReducers({
  reportTasks: reportsReducers.setReportTasks,
  reportsTableData: reportsReducers.setReportTableData
})

const Table = combineReducers({
    tableData: tableReducers.setTableData,
    currentWeek: tableReducers.setCurrentWeek,
    currentDay: tableReducers.setCurrentDay,
})

const User = combineReducers({
    user: userReducers.userSet,
    subordinates: userReducers.setSubordinates,
    pingedUser: userReducers.setPingedUser
})
const Admin = combineReducers({
  departments: departmentReducers.setDepartmentTree,
  department: departmentReducers.setDepartment,
  flatDepartments: departmentReducers.setFlatDepartments,
  users: usersReducers.setUsers,
  userView: usersReducers.setUser,
  usersPage: usersReducers.setUsersPage,
  financesPage: financesReducers.setFinancesPage,
  codesPage: codesReducers.setCodesPage,
  codesTable: codesReducers.setCodesTable,
  financesTable: financesReducers.setFinancesTable

})

export default combineReducers({
    ...taskBindings,
    ...layoutBindings,
    Table,
    User,
    Reports,
    Admin,
    form: formReducer,
    validationErrors: errorReducers.setValidationErrors
})
