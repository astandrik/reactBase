import React from "react";
import "../styles/taskTable.css";
import AddTrudModal from "../Modals/AddTrudModal";
import Container from "../Container";
import right from "../../Icons/right.svg";
import left from "../../Icons/left.svg";
import moment from 'moment';
import calendar from "../../Icons/calendar.svg";
import LaborListContainer from "../../containers/LaborListContainer";
import DatePicker from 'react-datepicker';
import helpers from "./tableHelpers";
import {RightPanelContainer} from "../../containers/Containers";
import LaborInfoContainer from "../../containers/LaborInfoContainer";


const datepickerStyles = {
  width: "70%",
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

const createTable = (tableData, props) => {
  const headers = helpers.generateHeaders(tableData.headers);
  const rows = helpers.generateRows(tableData, props.cellClickHandler, props.rowClickHandler, props);
  const range = helpers.getDateRange(props.currentWeek);
  let rightPanel = <div containerStyle={{display:"none"}}/>;
  if(props.rightPanelStatus && props.laborView) {
    rightPanel = (
      <div className={"rightPanelContainer " + (props.rightPanelStatus ? "opened" : "closed")} style={fullSize}>
        <RightPanelContainer>
          <LaborInfoContainer labor={props.laborView}  onSubmit={props.handleEditLaborSubmit}/>
        </RightPanelContainer>
      </div>
    )
  } else if(props.rightPanelStatus) {
    rightPanel = (
      <div className={"rightPanelContainer " + (props.rightPanelStatus ? "opened" : "closed")} style={fullSize}>
        <RightPanelContainer>
          <LaborListContainer  task={props.taskView} />
        </RightPanelContainer>
      </div>
    )
  }
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
      {rightPanel}
    </Container>
  )
}

export default (props) => {
  return createTable(props.tableData, props);
}