import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import calendar from "../../Icons/calendar.svg";
import TaskTrudTabContainer from "../../containers/TaskTrudTabContainer";
import moment from 'moment';
import AddTrudModalContainer from "../../containers/ModalContainers/AddTrudModalContainer";

export default (props) => {
  const task = props.task;
  const addTrudButton = (task) => (
    <div className={"addTrudButtonContainer "}>
      <div className="addTrudButton" onClick={props.openTrudModal.bind(this, task)}>
        Добавить трудозату
      </div>
    </div>
  )
  return (
    <Container vertical={true}>
      <div className="infoHeader" flex="1">
          <div className="infoHeaderBlock" style={{display: 'flex', justifyContent: "flex-begin"}}>
            <div>
              <img className="user" src={calendar} alt="logo" />
              <span>{moment(task.startDate).format("DD.MM.YY")}</span>
            </div>
          </div>
      </div>
      <Container vertical={true} flex="6" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
          <h2 flex="1" style={{margin:"5px", marginBottom: "20px"}}>
            {task.title}
          </h2>
          <div className="trud">
            <TaskTrudTabContainer/>
          </div>
      </Container>
      {addTrudButton(task)}
      <AddTrudModalContainer isModalOpen={props.isTrudModalOpen} closeModal={props.closeModal.bind(this)} onSubmit={props.handleTrudSubmit} containerStyle={{maxHeight: '0'}}/>
    </Container>
    )
}