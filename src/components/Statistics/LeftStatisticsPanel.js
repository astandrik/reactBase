import React from "react";
import Container from "../Container";
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Select from 'react-select';
import {Panel} from "../formComponents/ReusableComponents";
import moment from 'moment';
import calendar from "../../Icons/calendar.svg";
import DatePicker from 'react-datepicker';
import right from "../../Icons/right.svg";
import left from "../../Icons/left.svg";
import helpers from "../Table/tableHelpers";

const datepickerStyles = {
  width: "100%",
  display: "flex",
  float: "right",
  flexDirection: "row",
  justifyContent: "space-between",
  background: "white"
}

const datePicker = (props, range, type,  handlePrev,handleNext, selectDate, context)=> (
  <div style={datepickerStyles}>
    <img className="clickable-image left" onClick={handlePrev.bind(context, type)}  src={left} alt="logo" />
    <div className="dateContainer">
      <DatePicker
        selected={range.first ? moment(range.first) : moment(new Date())}
        onChange={selectDate.bind(context, type)}
      />
      <span className="weekVisualiser">{"Неделя " + helpers.getWeek(range.first) + " (" + moment(range.first).format("DD MMMM") + " - " + moment(range.last).format("DD MMMM") + ")" }</span>
    </div>
    <img className="clickable-image right" onClick={handleNext.bind(context, type)}  src={right} alt="logo" />
  </div>
)

const monthPicker = (props, range, type,  handlePrev,handleNext, selectDate, context)=> (
  <div style={datepickerStyles}>
    <img className="clickable-image left" onClick={handlePrev.bind(context, type)}  src={left} alt="logo" />
    <div className="dateContainer">
      <DatePicker
        selected={range.first ? moment(range.first) : moment(new Date())}
        onChange={selectDate.bind(context, type)}
      />
      <span className="weekVisualiser">{
        moment(range.first).format("MMMM YYYY").toUpperCase()}</span>
    </div>
    <img className="clickable-image right" onClick={handleNext.bind(context, type)}  src={right} alt="logo" />
  </div>
)

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
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

function getPrevWeek(now) {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
}

function getNextWeek(now) {
  return  new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
}

export default class Labors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: [],
      selectedTasks: [],
      selectedCodes: [],
      currentRadio: "tasks",
      task_ids: [],
      user_ids: [],
      code_ids: [],
      currentUser: false,
      user_id: false,
      type: 1
    }
  }
  loadPie(radio) {
      if(radio === "tasks") {
        this.props.loadTaskPie(this.state);
      } else {
        this.props.loadCodesPie(this.state);
      }
  }
  loadHisto(radio) {
      if(radio === "tasks") {
        this.props.loadTaskHisto(this.state);
      } else {
        this.props.loadCodesHisto(this.state);
      }
  }
  getUsers(query) {
    if (!query) {
      return Promise.resolve({ options: [] });
    }

    return fetch(`/data/searchusers?query=${query}`,
      {
        method: "GET",
        credentials: 'include'
      })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return { options: json.data.users.map(x => ({value: x.id, label: x.name})) };
    });
  }
  radiogroupChanged(event, val) {
    if(val === "tasks" ) {
      this.setState({
        currentRadio: val,
        code_ids: [],
        selectedCodes: [],
        currentUser: false,
        user_id: false,
        type: 1
      });
    } else if(val === "code") {
      this.setState({
        currentRadio: val,
        task_ids: [],
        selectedTasks: [],
        currentUser: false,
        user_id: false,
        type: 2
      });
    }
    this.props.radioChanged();
  }
  handleSelectChange(vals) {
    const user_ids = vals.map(x => x.value);
    this.props.getTasksForUsers(user_ids);
    this.setState({
      user_ids: user_ids,
      selectedUsers: vals
    })
  }
  handleSingleSelectChange(val) {
    this.setState({
      user_id: val.value,
      currentUser: val
    })
  }
  handleTaskSelectChange(vals) {
    const task_ids = vals.map(x => x.value);
    this.setState({
      task_ids: task_ids,
      selectedTasks: vals
    })
  }
  disableClick(disable) {
    if(!disable) {
      setTimeout(() => this.setState({ disableClick: disable }), 700);
    } else {
      this.setState({ disableClick: disable });
    }
    return true;
  }
  handleCodesSelectChange(vals) {
    const code_ids = vals.map(x => x.value);
    this.setState({
      code_ids: code_ids,
      selectedCodes: vals
    })
  }
  handlePrev(type) {
    if(type == "start") {
      this.props.changeFirstWeek(getPrevWeek(this.props.weekPeriod.first));
    } else {
      this.props.changeLastWeek(getPrevWeek(this.props.weekPeriod.last));
    }
  }
  handleNext(type) {
    if(type == "start") {
      this.props.changeFirstWeek(getNextWeek(this.props.weekPeriod.first));
    } else {
      this.props.changeLastWeek(getNextWeek(this.props.weekPeriod.last));
    }
  }
  dateSelect(type, val) {
    if(type == "start") {
      this.props.changeFirstWeek(getMonday(val.toDate()));
    } else {
      this.props.changeLastWeek(getMonday(val.toDate()));
    }
  }
  handleNextMonth(type, val) {
    if(type == "start") {
      this.props.selectFirstMonth(getNextMonth(this.props.monthPeriod.first));
    } else {
      this.props.selectLastMonth(getNextMonth(this.props.monthPeriod.last));
    }
  }
  handlePrevMonth(type, val) {
    if(type == "start") {
      this.props.selectFirstMonth(getPrevMonth(this.props.monthPeriod.first));
    } else {
      this.props.selectLastMonth(getPrevMonth(this.props.monthPeriod.last));
    }
  }
  dateMonthSelect(type, val) {
    if(type == "start") {
      this.props.selectFirstMonth(getMonday(val.toDate()));
    } else {
      this.props.selectLastMonth(getMonday(val.toDate()));
    }
  }
  render () {
  const props = this.props;
  const radio = this.state.currentRadio;
  const range1 = helpers.getDateRange(props.weekPeriod.first);
  const range2 = helpers.getDateRange(props.weekPeriod.last);
  const day1 = props.dayPeriod.first;
  const day2 = props.dayPeriod.last;
  const month1 = helpers.getDateMonthRange(props.monthPeriod.first);
  const month2 = helpers.getDateMonthRange(props.monthPeriod.last);
  let reportSelector = <div/>;
  switch (radio) {
    case "tasks":
      reportSelector = (
        <Select
            multi={true}
            placeholder="Задачи"
            value={this.state.selectedTasks}
            onChange={this.handleTaskSelectChange.bind(this)}
            options={this.props.currentTasks}
        />
      )
      break;
    case "code":
      reportSelector = (
        <Select  value={this.state.selectedCodes}
            multi={true}
            placeholder="Коды работ"
            value={this.state.selectedCodes}
            onChange={this.handleCodesSelectChange.bind(this)}
            options={
                this.props.codes
            } // <-- Receive options from the form
            />
      )
      break
    default:
      reportSelector = <div className="noDisplay"/>
  }
  const bar = props.bar;
  let picker = <div className="noDisplay"/>;
  const period = props.period;
  if(period === 1 && bar.length) {
    picker = (
      <div className="dayPicker">
        <DatePicker
          selected={moment(day1)}
          onChange={this.props.selectFirstDay.bind(this)}
        />
        <DatePicker
          selected={moment(day2)}
          onChange={this.props.selectLastDay.bind(this)}
        />
      </div>
    )
  } else if(period === 3 && bar.length) {
    picker = (
      <div className="weekPicker">
        {monthPicker.call(this,props,month1, "start", this.handlePrevMonth, this.handleNextMonth, this.dateMonthSelect, this)}
        {monthPicker.call(this,props,month2, "end", this.handlePrevMonth, this.handleNextMonth, this.dateMonthSelect, this)}
      </div>
    )
  } else {
    picker = (
      <div className="weekPicker">
        {datePicker.call(this,props,range1, "start", this.handlePrev, this.handleNext, this.dateSelect, this)}
        {datePicker.call(this,props,range2, "end", this.handlePrev, this.handleNext, this.dateSelect, this)}
      </div>
    )
  }
  const weeksPicker = (
    <div className="weeksPicker">
      <DatePicker
        selected={this.startWeekSelect ? moment(this.startWeekSelect) : moment(new Date())}
        onChange={this.startWeekSelect}
      />
      <DatePicker
        selected={this.endWeekSelect ? moment(this.endWeekSelect) : moment(new Date())}
        onChange={this.endWeekSelect}
      />
    </div>
  )
  return (
    <Container vertical={true}>
      <h3 className="reports-header"> Сотрудники</h3>
      <div className="user-report-select" flex="2">
        <Select.Async multi={radio === "table" ? false : true} value={this.state.selectedUsers}
        onChange={this.handleSelectChange.bind(this)}
        searchPromptText="Введите имя пользователя"
          placeholder={radio === "table" ? "Сотрудник" : "Список выбранных сотрудников"}
          backspaceRemoves={false}
          ignoreCase={true}
          onFocus={this.disableClick.bind(this, true)}
          onBlur={this.disableClick.bind(this, false)}
        loadOptions={this.getUsers} />
      </div>
      <div className={"elements-report-select"} flex="4">
        <RadioButtonGroup className={"report-type-choose-radio " +  (this.state.disableClick  ? "no-events-tree" : "")} name="user_type" valueSelected={this.state.currentRadio}
           onChange={this.radiogroupChanged.bind(this)}>
          <RadioButton
            value="tasks"
            label="Задачи"
          />
          <RadioButton
            value="code"
            label="Коды работ"
          />
        </RadioButtonGroup>
        {reportSelector}
      </div>
      {picker}
      <div className="button-statistics-create" flex="1">
        <FlatButton style={{float:"right"}}  label="Диаграмма" onClick={this.loadPie.bind(this, radio)} />
        <FlatButton style={{float:"right"}}  label="Гистограмма" onClick={this.loadHisto.bind(this, radio)} />
      </div>
    </Container>
    )
  }
}