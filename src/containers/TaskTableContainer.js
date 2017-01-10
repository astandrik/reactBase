import TaskTable from "../components/Table/TaskTable";
import { connect } from 'react-redux';
import {deactivateTasks, groupLabors, setGroupedLabors, setLabor,setAddingTrudTask,loadTaskShort} from "../redux/actions/tasksActions";
import {openTrudModal, closeTrudModal, toggleRightPanel} from "../redux/actions/layoutActions";
import {changeWeek, setCurrentWeek} from "../redux/actions/tableActions";
import {reset} from 'redux-form';

const mapStateToProps = (state,ownProps) => {
  return {
    tasks: state.tasks,
    rightPanelStatus: state.rightPanelStatus,
    tableData: state.tableData,
    currentWeek: state.currentWeek,
    taskView: state.taskView,
    isTrudModalOpen: state.isTrudModalOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRightClose: () => {
      dispatch(deactivateTasks());
    },
    cellClickHandler: (data, id) => {
      if(data && data.length) {
        const groups = groupLabors(data);
        dispatch(loadTaskShort({id}));
        dispatch(setGroupedLabors({groups}));
        dispatch(toggleRightPanel({status: 1}));
      } else if (data) {
        alert("Ebin))");
      } else {
        dispatch(openTrudModal());
        const taskCallback = (task) => {
            dispatch(setAddingTrudTask({task}));
        };
        dispatch(loadTaskShort({id}, taskCallback));

      }
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