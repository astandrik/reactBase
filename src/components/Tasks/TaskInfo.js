import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import calendar from "../../Icons/calendar.svg";
import ellipsis from "../../Icons/ellipsis.svg";
import comment from "../../Icons/speech-bubbles-comment-option.svg";
import clock from "../../Icons/clock.svg";
import TaskTrudTabContainer from "../../containers/TaskTrudTabContainer";
import TaskCommentsTabContainer from "../../containers/TaskCommentsTabContainer";
import moment from 'moment';
import AddTrudModalContainer from "../../containers/ModalContainers/AddTrudModalContainer";

export default (props) => {
  const task = props.task;
  const imagesPanel = (
    <div style={{display: 'flex', justifyContent: "flex-end"}}>
      <div style={{marginRight:"15px"}}>
        <img className="clickable-image clock" onClick={props.chooseCurrentTaskTab.bind(this, 'trud')} src={clock} alt="logo" />
        <img className="clickable-image comment" onClick={props.chooseCurrentTaskTab.bind(this, 'comment')} src={comment} alt="logo" />
      </div>
      <div style={{width:"1px", borderRight: "1px solid black"}}></div>
      <div style={{marginLeft:"15px"}}>
        <img className="clickable-image ellipsis" src={ellipsis} alt="logo" />
      </div>
    </div>
  )
  const addTrudButton = (task) => (
    <div className={"addTrudButtonContainer " + (props.activeTab !== "trud" ? "noDisplay" : "")}>
      <div className="addTrudButton" onClick={props.openTrudModal.bind(this, task)}>
        Добавить трудозату
      </div>
    </div>
  )
  return (
    <Container vertical={true}>
      <div className="infoHeader" flex="1">
        <Container style={{justifyContent: "space-between"}}>
          <div className="infoHeaderBlock" style={{display: 'flex', justifyContent: "flex-begin"}}>
            <span>{task.manager}</span>
            <div>
              <img className="user" src={calendar} alt="logo" />
              <span>{moment(task.startDate).format("DD.MM.YY")}</span>
            </div>
          </div>
          {imagesPanel}
        </Container>
      </div>
      <Container vertical={true} flex="6" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
          <h2 flex="1" style={{margin:"5px", marginBottom: "20px"}}>
            {task.title}
          </h2>
          <Container flex="3">
            <div className="taskPanel">
              <span className="panelLabel"> Код работ </span>
              <span className="panelText"> {task.code} </span>
            </div>
            <div  className="taskPanel">
              <span className="panelLabel"> Статья финансирования </span>
              <span className="panelText"> {task.finance} </span>
            </div>
          </Container>
          <div className="taskPanel" flex="4" containerStyle={{minHeight: "200px"}}>
            <span className="panelLabel"> Описание </span>
            <span className={"panelText " + (!task.descriptionOpen ? "" : "noDisplay")}>
              {task.shortDescription} <span style={{fontSize:"20px"}}>...</span>
              <span style={{textDecoration: "underline", color:"blue",cursor:"pointer"}} onClick={props.openDescription.bind(this, task)}>Подробнее...</span>
            </span>
            <span  className={"panelText " + (task.descriptionOpen ? "" : "noDisplay")}>
              {task.description}
            </span>
          </div>
          <div className={(props.activeTab !== "trud") ? "noDisplay" : ""}>
            <TaskTrudTabContainer/>
          </div>
          <div className={(props.activeTab !== "comment") ? "noDisplay" : ""}>
            <TaskCommentsTabContainer onSubmit={props.handleSubmit} task={task}/>
          </div>
      </Container>
      {addTrudButton(task)}
      <AddTrudModalContainer isModalOpen={props.isTrudModalOpen} closeModal={props.closeModal.bind(this)} onSubmit={props.handleTrudSubmit} containerStyle={{maxHeight: '0'}}/>
    </Container>
    )
}