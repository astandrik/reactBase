import TaskTable from "../components/Table/TaskTable";
import { connect } from 'react-redux';
import {deactivateTasks, setGroupedLabors, setLabor,setAddingTrudTask,loadTask, editLabor, setGroupedTableLabors} from "../redux/actions/tasksActions";
import {openTrudModal, closeTrudModal, toggleRightPanel} from "../redux/actions/layoutActions";
import {changeWeek, setCurrentWeek, setCurrentDay} from "../redux/actions/tableActions";
import {reset} from 'redux-form';

import LaborToSend from "../Entities/Tasks/LaborToSend";

const mapStateToProps = (state,ownProps) => {
  return {
    tasks: state.tasks,
    rightPanelStatus: state.rightPanelStatus,
    tableData: state.tableData,
    currentWeek: state.currentWeek,
    taskView: state.taskView,
    isTrudModalOpen: state.isTrudModalOpen,
    laborView: state.laborView
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRightClose: () => {
      dispatch(deactivateTasks());
    },
    cellClickHandler: (data, id, date) => {
      dispatch(setCurrentDay({day: date}));
      if(data && data.length) {
        dispatch(loadTask({id}));
        dispatch(toggleRightPanel({status: 1}));
      } else if (data) {
        alert("Ebin))");
      } else {
        dispatch(openTrudModal());
        const taskCallback = (task) => {
            dispatch(setAddingTrudTask({task}));
        };
        dispatch(loadTask({id}, taskCallback));

      }
    },
    rowClickHandler: (data, id) => {
      if(data && data.length) {
        dispatch(setCurrentDay({day: false}));
        dispatch(loadTask({id}));
        dispatch(toggleRightPanel({status: 1}));
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
    handleEditLaborSubmit: (json) => {
      const labor = LaborToSend(json);
      labor.status = 0;
      dispatch(editLabor(labor,true));
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