import TaskList from "../components/Tasks/TaskList";
import { connect } from 'react-redux';
import {openTrudModal, closeTrudModal, toggleRightPanel} from "../redux/actions/layoutActions";
import {reset} from 'redux-form';
import {loadTask, activateTask, toggleTaskTreeOpen,toggleTaskOpen,
   deactivateTasks,setTaskView,loadWorkCodes, createTask} from "../redux/actions/tasksActions";

const mapStateToProps = (state,ownProps) => {
  return {
    tasks: state.tasks,
    menuItems: ownProps.menuItems,
    value: 1,
    tasksOpened: state.tasksOpened,
    taskView: state.taskView,
    rightPanelStatus: state.rightPanelStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTask: (id) => {
      dispatch(loadTask({id}));
      dispatch(activateTask({id}));
    },
    toggleOpen: (index)=> {
      dispatch(toggleTaskTreeOpen({index: index}));
    },
    toggleTaskOpen: (id)=> {
      dispatch(toggleTaskOpen({id: id}));
    },
    onRightClose: () => {
      dispatch(deactivateTasks());
    },
    handleNewTaskSubmit: (json) =>  {
      json.parent_id = 0;
      json.start_dt = (new Date(json.startDate)).getTime() * 1000;
      dispatch(createTask(json));
      dispatch(reset('newTaskInfoDialogForm'));
    },
    handleAddNewTask: () => {
      dispatch(loadWorkCodes());
      dispatch(setTaskView({
        task: {type: "new"}
      }));
      dispatch(toggleRightPanel({status: 1}));
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default Visible