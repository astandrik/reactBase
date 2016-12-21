import TaskTable from "../components/Table/TaskTable";
import { connect } from 'react-redux';
import {deactivateTasks} from "../redux/actions/tasksActions";
import {openTrudModal,closeTrudModal} from "../redux/actions/layoutActions";
import {reset} from 'redux-form';

const mapStateToProps = (state,ownProps) => {
  return {
    tasks: state.tasks,
    rightPanelStatus: state.rightPanelStatus,
    tableData: state.tableData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRightClose: () => {
      dispatch(deactivateTasks());
    },
    openTrudModal: () => {
      dispatch(openTrudModal({}));
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
)(TaskTable)

export default Visible