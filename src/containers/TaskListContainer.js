import TaskList from "../components/Tasks/TaskList";
import {
    connect
} from 'react-redux';
import {
    toggleRightPanel,
    setClientHeight
} from "../redux/actions/layoutActions";
import {
    loadTask,
    activateTask,
    toggleTaskOpen,
    setTaskView,
    createTask,
    editTask,
    editLabor,
    changeTreeFilter
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
        taskView: state.taskView,
        rightPanelStatus: state.rightPanelStatus,
        laborView: state.laborView,
        tableData: state.tableData,
        treeFilter: state.treeFilter,
        activeIndexes: state.activeIndexes,
        openedTasks: state.openedTasks,
        clientHeight: state.clientHeight
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTask: (task) => {
            dispatch(loadTask({
                id: task.id
            }));
            dispatch(activateTask({
                globalIndex: task.globalIndex
            }));
            dispatch(setCurrentDay({day: false}));
        },
        toggleTaskOpen: (task) => {
            dispatch(toggleTaskOpen({
                globalIndex: task.globalIndex
            }));
        },
        handleNewTaskSubmit: (json) => {
            let task = TaskToSend(json);
            dispatch(createTask(task));
        },
        handleEditTaskSubmit: (json) => {
            let task = TaskToSend(json);
            dispatch(editTask(task, json));
        },
        setClientHeight: (height) => {
          dispatch(setClientHeight({height}));
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
        },
        filterChange: (value) => {
          dispatch(changeTreeFilter({value}));
        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)

export default Visible;
