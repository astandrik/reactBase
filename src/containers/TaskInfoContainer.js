import TaskInfo from "../components/Tasks/TaskInfo";
import { connect } from 'react-redux';
import {setActiveTaskTab, openDescription} from "../redux/actions/tasksActions";
import {openTrudModal,closeTrudModal} from "../redux/actions/layoutActions";

const mapStateToProps = (state,ownProps) => {
  return {
    task: ownProps.task,
    activeTab: state.activeTaskTab,
    isTrudModalOpen: state.isTrudModalOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    chooseCurrentTaskTab: (tab) => {
      dispatch(setActiveTaskTab({value: tab}));
    },
    openDescription: (task) => {
      dispatch(openDescription({task: task}));
    },
    openTrudModal: () => {
      dispatch(openTrudModal({}));
    },
    handleSubmit: (json) =>  {
      debugger;
    },
    handleTrudSubmit: (json) => {
      debugger;
    },
    closeModal: () => {
      dispatch(closeTrudModal({}));
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskInfo)

export default Visible;