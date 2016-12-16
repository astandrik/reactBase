import TaskList from "../components/Tasks/TaskList";
import { connect } from 'react-redux';
import {loadTask, activateTask, toggleTaskTreeOpen,toggleTaskOpen, deactivateTasks,loadLabors} from "../redux/actions/tasksActions";

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
      dispatch(loadLabors({id}));
    },
    toggleOpen: (index)=> {
      dispatch(toggleTaskTreeOpen({index: index}));
    },
    toggleTaskOpen: (id)=> {
      dispatch(toggleTaskOpen({id: id}));
    },
    onRightClose: () => {
      dispatch(deactivateTasks());
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default Visible