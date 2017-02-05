import LeftStatisticsPanel from "../../components/Statistics/LeftStatisticsPanel";
import { connect } from 'react-redux';
import {
loadPie,
loadHisto,
setWeekPeriod,
setDayPeriod,
setMonthPeriod
} from "../../redux/actions/statisticsActions";
import {
  getUserTasks,
  deleteTableData
  } from "../../redux/actions/reportsActions";
import {changeWeek, setCurrentWeek, setCurrentDay, loadTableData} from "../../redux/actions/tableActions";


const mapStateToProps = (state,ownProps) => {
  return {
    codes: state.codes,
    currentTasks: state.Reports.reportTasks,
    currentWeek: state.Table.currentWeek,
    weekPeriod: state.Statistics.weekPeriod,
    period: state.Statistics.period,
    dayPeriod: state.Statistics.dayPeriod,
    monthPeriod: state.Statistics.monthPeriod,
    pie: state.Statistics.pie,
    bar: state.Statistics.bar
  }
}


function getNextMonth(now) {
  if (now.getMonth() == 11) {
      var current = new Date(now.getFullYear() + 1, 0, 13);
  } else {
      var current = new Date(now.getFullYear(), now.getMonth() + 1, 13);
  }
  return current;
}

function getPrevMonth(now) {
  if (now.getMonth() == 0) {
      var current = new Date(now.getFullYear() - 1, 11, 13);
  } else {
      var current = new Date(now.getFullYear(), now.getMonth() - 1, 13);
  }
  return current;
}


const mapDispatchToProps = (dispatch) => {
  return {
    onDateSelect: (day) => {
      dispatch(setCurrentWeek({day: day}));
      dispatch(deleteTableData());
    },
    getTasksForUsers: (user_ids) => {
      dispatch(getUserTasks(user_ids));
    },
    loadTaskPie: (state) => {
      let obj = {};
      obj.user_ids = state.user_ids;
      obj.task_ids = state.task_ids;
      obj.type = state.type;
      dispatch(loadPie(obj));
    },
    selectFirstDay:(day) => {
      if(day.toDate) {
        day = day.toDate();
      }
      dispatch(setDayPeriod({first: day}));
    },
    selectLastDay:(day) => {
      if(day.toDate) {
        day = day.toDate();
      }
      dispatch(setDayPeriod({last: day}));
    },
    changeFirstWeek: (date)=> {
      dispatch(setWeekPeriod({first: date}));
    },
    changeLastWeek: (date) => {
      dispatch(setWeekPeriod({last: date}));
    },
    selectFirstMonth: (date) => {
      dispatch(setMonthPeriod({first: date}));
    },
    selectLastMonth: (date) => {
      dispatch(setMonthPeriod({last: date}));
    },
    loadCodesPie: (state) => {
      let obj = {};
      obj.user_ids = state.user_ids;
      obj.code_ids = state.code_ids;
      obj.type = state.type;
      dispatch(loadPie(obj));
    },
    loadTaskHisto: (state) => {
      let obj = {};
      obj.user_ids = state.user_ids;
      obj.task_ids = state.task_ids;
      obj.type = state.type;
      dispatch(loadHisto(obj));
    },
    loadCodesHisto: (state) => {
      let obj = {};
      obj.user_ids = state.user_ids;
      obj.code_ids = state.code_ids;
      obj.type = state.type;
      dispatch(loadHisto(obj));
    },
    onDateMonthSelect: (day) => {
      const current = new Date(day.toDate().getFullYear(),  day.toDate().getMonth(), 13);
      dispatch(setCurrentWeek({day: current}));
      dispatch(deleteTableData());
    },
    handlePrevMonth: (weekStart) => {
      const prev = new Date(getPrevMonth(weekStart));
      dispatch(setCurrentWeek({day: prev}));
      dispatch(deleteTableData());
    },
    handlePrevWeek: (weekStart) => {
      const prev = new Date(weekStart.getTime() - 2 * 24 * 60 * 60 * 1000);
      dispatch(setCurrentWeek({day: prev}));
      dispatch(deleteTableData());
    },
    handleNextWeek: (weekStart) => {
      const next = new Date(weekStart.getTime() + 9 * 24 * 60 * 60 * 1000);
      dispatch(setCurrentWeek({day: next}));
      dispatch(deleteTableData());
    },
    handleNextMonth: (weekStart) => {
      const next = new Date(getNextMonth(weekStart));
      dispatch(setCurrentWeek({day: next}));
      dispatch(deleteTableData());
    },
    radioChanged: () => {
      dispatch(deleteTableData());
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftStatisticsPanel)

export default Visible;