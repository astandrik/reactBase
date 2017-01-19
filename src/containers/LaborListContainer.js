import LaborList from "../components/Tasks/LaborList";
import { connect } from 'react-redux';
import {setActiveTaskTab, openDescription,setAddingTrudTask, createLabor} from "../redux/actions/tasksActions";
import {openTrudModal,closeTrudModal} from "../redux/actions/layoutActions";
import {reset} from 'redux-form';
import LaborToSend from "../Entities/Tasks/LaborToSend";

const mapStateToProps = (state,ownProps) => {
  return {
    task: ownProps.task,
    isTrudModalOpen: state.isTrudModalOpen,
    groups: state.groupedTableLabors
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
    openTrudModal: (task) => {
      dispatch(openTrudModal());
      dispatch(setAddingTrudTask({task}))
    },
    handleSubmit: (json) =>  {
      debugger;
      dispatch(reset('commentForm'));
    },
    handleTrudSubmit: (task, json) => {
        let labor = LaborToSend(json);
        labor.task_id = task.id;
        dispatch(createLabor(labor, task));
    },
    closeModal: () => {
      dispatch(closeTrudModal({}));
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(LaborList)

export default Visible;