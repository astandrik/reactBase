import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import calendar from "../../Icons/calendar.svg";
import TaskTrudTabContainer from "../../containers/TaskTrudTabContainer";
import moment from 'moment';
import AddTrudModalContainer from "../../containers/ModalContainers/AddTrudModalContainer";
import ConfirmModalContainer from "../../containers/ModalContainers/ConfirmModalContainer";

export default class Labors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
  }
  openConfirm() {
    this.setState({isModalOpen: true});
  }
  closeConfirm() {
    this.setState({isModalOpen: false});
  }
  acceptAnswer(answer) {
    this.closeConfirm.bind(this)();
    if(answer) {
      this.props.acceptAll(this.props.task.timings, this.props.task);
    }
  }
  render () {
  const props = this.props;
  const task = props.task;
  const message = "Принять все трудозатраты из списка?";
  if(!task) {
    return <div/>;
  }
  const addTrudButton = (task) => (
    <div className={"addTrudButtonContainer "}>
      <div className={"addTrudButton" +  `${task.rights.time ? "" : "disabled"}`} onClick={props.openTrudModal.bind(this, task)}>
        Добавить трудозату
      </div>
      <div>
        <div className={"addTrudButton" +  `${task.timings.every(x => x.rights.accept) ? "" : "disabled"}`} onClick={this.openConfirm.bind(this)}>
          Принять все
        </div>
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
            <TaskTrudTabContainer type="table"/>
          </div>
      </Container>
      {addTrudButton(task)}
      <AddTrudModalContainer isModalOpen={props.isTrudModalOpen} closeModal={props.closeModal.bind(this)} onSubmit={props.handleTrudSubmit.bind(this, task)} containerStyle={{maxHeight: '0'}}/>
      <ConfirmModalContainer containerStyle={{maxHeight: '0'}} isModalOpen={this.state.isModalOpen} message={message} answer={this.acceptAnswer.bind(this)}/>
    </Container>
    )
  }
}