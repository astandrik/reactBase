import TaskList from "../components/Tasks/TaskList";
import {
    connect
} from 'react-redux';
import {
    toggleRightPanel,
    closeErrorsModal
} from "../redux/actions/layoutActions";
import {
    reset
} from 'redux-form';
import {
    loadTask,
    activateTask,
    toggleTaskTreeOpen,
    toggleTaskOpen,
    deactivateTasks,
    setTaskView,
    createTask,
    removeCurrentTask,
    editTask
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
            json.executors = json.executors ? json.executors.map(x => x.value) : [];
            json.parent_id = json.parent_id || 0;
            json.start_dt = (new Date(json.startDate)).getTime() / 1000;
            json.code_id = json.code;
            dispatch(createTask(json));
        },
        handleEditTaskSubmit: (json) => {
            json.start_dt = (new Date(json.startDate)).getTime() / 1000;
            json.code_id = json.code ? (json.code.value ? json.code.value : json.code) : 0;
            dispatch(editTask(json));
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
