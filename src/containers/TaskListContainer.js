import TaskList from "../components/Tasks/TaskList";
import {
    connect
} from 'react-redux';
import {
    toggleRightPanel,
    closeErrorsModal
} from "../redux/actions/layoutActions";
import {
    loadTask,
    activateTask,
    toggleTaskTreeOpen,
    toggleTaskOpen,
    deactivateTasks,
    setTaskView,
    createTask,
    editTask,
    editLabor
} from "../redux/actions/tasksActions";

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: state.tasks,
        menuItems: ownProps.menuItems,
        value: 1,
        tasksOpened: state.tasksOpened,
        taskView: state.taskView,
        rightPanelStatus: state.rightPanelStatus,
        isErrorsModalOpen: state.isErrorsModalOpen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTask: (id) => {
            dispatch(loadTask({
                id
            }));
            dispatch(activateTask({
                id
            }));
        },
        toggleOpen: (index) => {
            dispatch(toggleTaskTreeOpen({
                index: index
            }));
        },
        toggleTaskOpen: (id) => {
            dispatch(toggleTaskOpen({
                id: id
            }));
        },
        onRightClose: () => {
            dispatch(deactivateTasks());
        },
        handleNewTaskSubmit: (json) => {
            let newJson = {};
            Object.assign(newJson, json);
            newJson.executors = json.executors ? json.executors.map(x => x.value) : [];
            newJson.parent_id = json.parent_id || 0;
            newJson.start_dt = (new Date(json.startDate)).getTime() / 1000;
            newJson.code_id = json.code;
            newJson.finance_id = json.finance;
            dispatch(createTask(newJson));
        },
        handleEditTaskSubmit: (json) => {
            let newJson = {};
            Object.assign(newJson, json);
            newJson.start_dt = (new Date(json.startDate)).getTime() / 1000;
            newJson.code_id = json.code ? (json.code.value ? json.code.value : json.code) : 0;
            newJson.finance_id = json.finance ? (json.finance.value ? json.finance.value : json.finance) : 0;
            delete newJson.finance;
            newJson.status = json.rawstatus;
            newJson.executors = json.executors ? json.executors.map(x => x.value) : [];
            dispatch(editTask(newJson, json));
        },
        handleEditLaborSubmit: (json) => {
          json.code_id = json.code;
          json.value = json.hours;
          json.date = (new Date(json.startDate)).getTime() / 1000;
          json.finance_id =  json.finance ? (json.finance.value ? json.finance.value : json.finance) : 0;
          dispatch(editLabor(json));
        },
        handleAddNewTask: () => {
            dispatch(setTaskView({
                task: {
                    type: "new"
                }
            }));
            dispatch(toggleRightPanel({
                status: 1
            }));
        },
        closeModal: () => {
            dispatch(closeErrorsModal({}));
        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)

export default Visible;
