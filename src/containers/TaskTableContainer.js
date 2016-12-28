import TaskTable from "../components/Table/TaskTable";
import { connect } from 'react-redux';
import {deactivateTasks} from "../redux/actions/tasksActions";
import {openTrudModal,closeTrudModal} from "../redux/actions/layoutActions";
import {changeWeek, setCurrentWeek} from "../redux/actions/tableActions";
import {reset} from 'redux-form';

const mapStateToProps = (state,ownProps) => {
  return {
    tasks: state.tasks,
    rightPanelStatus: state.rightPanelStatus,
    tableData: state.tableData,
    currentWeek: state.currentWeek,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRightClose: () => {
      dispatch(deactivateTasks());
    },
    onDateSelect: (day) => {
      dispatch(setCurrentWeek({day: day}));
      dispatch(changeWeek({day: day}));
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
    },
    handlePrevWeek: (weekStart) => {
      const prev = new Date(weekStart.getTime() - 2 * 24 * 60 * 60 * 1000);
      dispatch(setCurrentWeek({day: prev}));
      dispatch(changeWeek({day: prev}));
    },
    handleNextWeek: (weekStart) => {
      const next = new Date(weekStart.getTime() + 9 * 24 * 60 * 60 * 1000);
      dispatch(setCurrentWeek({day: next}));
      dispatch(changeWeek({day: next}));
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskTable)

export default Visible