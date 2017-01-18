import LaborList from "../components/Tasks/LaborList";
import { connect } from 'react-redux';
import {setActiveTaskTab, openDescription,setAddingTrudTask} from "../redux/actions/tasksActions";
import {openTrudModal,closeTrudModal} from "../redux/actions/layoutActions";
import {reset} from 'redux-form';

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
    handleTrudSubmit: (json) => {
      debugger;
      dispatch(reset('trudDialogForm'));
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