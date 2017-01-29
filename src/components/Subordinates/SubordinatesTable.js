import React from "react";
import "../styles/taskTable.css";
import AddTrudModal from "../Modals/AddTrudModal";
import Container from "../Container";
import right from "../../Icons/right.svg";
import left from "../../Icons/left.svg";
import moment from 'moment';
import calendar from "../../Icons/calendar.svg";
import DatePicker from 'react-datepicker';
import helpers from "../Table/tableHelpers";
import {RightPanelContainer} from "../../containers/Containers";
import LaborInfoContainer from "../../containers/LaborInfoContainer";
import ConfirmModalContainer from "../../containers/ModalContainers/ConfirmModalContainer";
import RightTablePanelContainer from "../../containers/RightTablePanelContainer";


const datepickerStyles = {
  width: "100%",
  display: "flex",
  float: "right",
  flexDirection: "row",
  justifyContent: "space-between",
  background: "white"
}

const fullSize = {
  width:"100%",
  height: "100%"
}

const datePicker = (props, range)=> (
  <div style={datepickerStyles}>
    <img className="clickable-image left" onClick={props.handlePrevWeek.bind(this,props.currentWeek)}  src={left} alt="logo" />
    <div className="dateContainer">
      <span className="weekVisualiser">{"Неделя " + helpers.getWeek(props.currentWeek) + " (" + moment(range.first).format("DD MMMM") + " - " + moment(range.last).format("DD MMMM") + ")" }</span>
      <img className="tableCalendar" src={calendar} alt="logo" />
      <DatePicker
        selected={props.currentWeek ? moment(props.currentWeek) : moment(new Date())}
        onChange={props.onDateSelect}
      />
    </div>
    <img className="clickable-image right" onClick={props.handleNextWeek.bind(this,props.currentWeek)}  src={right} alt="logo" />
  </div>
)

function createTable (tableData, props) {
  const rowsObj = helpers.generateRows(tableData, props.cellClickHandler, props.rowClickHandler, props);
  const rows = rowsObj.rows;
  const message = "Принять все трудозатраты за " + this.state.date + "?";
  const headers = helpers.generateHeaders(tableData.headers, rowsObj.datedLabors, this.openConfirm.bind(this));
  const range = helpers.getDateRange(props.currentWeek);
  const rightPanelContainerStyle = this.props.rightPanelStatus ? {} : {maxWidth: "0"};
  const rightPanelClass = this.props.rightPanelStatus  ? "" : "right-closed";
  return (
    <Container>
      <div className="tableContainer">
        {datePicker(props,range)}
        <div className="taskTable">
          <table className="taskTable" cellSpacing="0">
            <thead>
              <tr>
                {headers}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          <AddTrudModal isModalOpen={props.isTrudModalOpen} closeModal={props.closeModal.bind(this)} onSubmit={props.handleTrudSubmit} containerStyle={{maxHeight: '0'}}/>
        </div>
      </div>
      <div className={`splitter ${(props.rightPanelStatus ? "" : "noDisplay")}`}/>
     <RightTablePanelContainer containerStyle={rightPanelContainerStyle} className={rightPanelClass}/>
     <ConfirmModalContainer containerStyle={{maxWidth: '0'}} isModalOpen={this.state.isModalOpen} message={message} answer={this.acceptAnswer.bind(this)}/>
    </Container>
  )
}

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      date: "null",
      labors: []
    }
  }
  openConfirm(date, labors) {
    this.setState({
      date: date,
      labors: labors
    });
    this.setState({isModalOpen: true});
  }
  closeConfirm() {
    this.setState({isModalOpen: false});
  }
  acceptAnswer(answer) {
    this.closeConfirm.bind(this)();
    if(answer) {
      this.props.acceptAll(this.state.labors);
    }
  }
  render() {
    const props = this.props;
    return createTable.call(this,props.tableData, props);
  }
}