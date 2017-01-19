import TaskList from "../components/Tasks/TaskList";
import {
    connect
} from 'react-redux';
import {
    toggleRightPanel
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
import {
  loadTableData,
  setCurrentDay
} from "../redux/actions/tableActions";

import LaborToSend from "../Entities/Tasks/LaborToSend";
import TaskToSend from "../Entities/Tasks/TaskToSend";

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: state.tasks,
        menuItems: ownProps.menuItems,
        value: 1,
        tasksOpened: state.tasksOpened,
        taskView: state.taskView,
        rightPanelStatus: state.rightPanelStatus,
        laborView: state.laborView,
        tableData: state.tableData
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
            dispatch(setCurrentDay({day: false}));
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
            let task = TaskToSend(json);
            dispatch(createTask(task));
        },
        handleEditTaskSubmit: (json) => {
            let task = TaskToSend(json);
            dispatch(editTask(task, json));
        },
        handleEditLaborSubmit: (json) => {
          const labor = LaborToSend(json);
          labor.status = 0;
          dispatch(editLabor(labor, true));
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
        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)

export default Visible;
