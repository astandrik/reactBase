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
    setFilters,
    loadTasks
} from "../redux/actions/tasksActions";
import {
  setCurrentDay
} from "../redux/actions/tableActions";

import LaborToSend from "../Entities/Tasks/LaborToSend";
import TaskToSend from "../Entities/Tasks/TaskToSend";

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: state.tasks,
        rightPanelStatus: state.rightPanelStatus,
        activeIndexes: state.activeIndexes,
        openedTasks: state.openedTasks,
        clientHeight: state.clientHeight
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTask: (task) => {
            dispatch(activateTask({
               globalIndex: task.globalIndex,
               taskId: task.id
            }));
            dispatch(loadTask({
                id: task.id
            }));
            dispatch(setCurrentDay({day: false}));
        },
        applyFilters:(filters) => {
          const filt = {sub_ids: filters.subs, types: filters.types, all_subs: filters.allSubs};
          dispatch(setFilters({filters: filt}));
          dispatch(loadTasks());
        },
        toggleTaskOpen: (task) => {
            dispatch(toggleTaskOpen({
                globalIndex: task.globalIndex
            }));
        },
        setClientHeight: (height) => {
          dispatch(setClientHeight({height}));
        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)

export default Visible;
