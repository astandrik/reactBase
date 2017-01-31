import RightDepartmentPanel from "../../components/Admin/RightDepartmentPanel";
import { connect } from 'react-redux';
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
} from "../../redux/actions/tasksActions";
import {
    toggleRightPanel,
    setClientHeight
} from "../../redux/actions/layoutActions";
import LaborToSend from "../../Entities/Tasks/LaborToSend";
import TaskToSend from "../../Entities/Tasks/TaskToSend";

const mapStateToProps = (state,ownProps) => {
  return {
    department: state.department
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
)(RightDepartmentPanel)

export default Visible;