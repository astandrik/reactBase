import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import calendar from "../../Icons/calendar.svg";
import ellipsis from "../../Icons/ellipsis.svg";
import comment from "../../Icons/speech-bubbles-comment-option.svg";
import clock from "../../Icons/clock.svg";
import TaskTrudTabContainer from "../../containers/TaskTrudTabContainer";
import TaskCommentsTabContainer from "../../containers/TaskCommentsTabContainer";
import { Field, reduxForm } from 'redux-form'
import moment from 'moment';
import {connect} from 'react-redux';
import AddTrudModalContainer from "../../containers/ModalContainers/AddTrudModalContainer";
import SelectInput from "../formComponents/SelectInput";
import DPicker from "../formComponents/DatePicker";
import helpers from "./taskHelpers";

const  TaskInfoComponent =  class newTaskInfo extends React.Component {
    render () {
  const props=this.props;
  const task = props.task;
  const {handleSubmit} = props;
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
  const executorNames = helpers.createExecutors(task.executors);
  const addTrudButton = (task) => (
    <div flex="2" className={"addTrudButtonContainer " + (props.activeTab !== "trud" ? "noDisplay" : "")}>
      <div className="addTrudButton" onClick={props.openTrudModal.bind(this, task)}>
        Добавить трудозату
      </div>
    </div>
  )
  if(!task.name) {
    return <div/>;
  } else {
  return (
    <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", height: "100%"}}>
      <Container vertical={true}>
        <div className="infoHeader" flex="1">
          <Container style={{justifyContent: "space-between"}}>
            <div className="infoHeaderBlock" style={{display: 'flex', justifyContent: "flex-begin"}}>
              <div className="executorNames">{executorNames}</div>
              <div>
                <img className="user" src={calendar} alt="logo" />
                <Field name="startDate" component={DPicker}/>
              </div>
            </div>
            {imagesPanel}
          </Container>
        </div>
        <Container vertical={true} flex="11" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
            <h2 flex="1" style={{margin:"5px", marginBottom: "20px"}}>
              <Field className="fieldValue taskHeader" name="name" component="input" placeholder="Название задачи"/>
            </h2>
            <Container flex="3">
              <div className="taskPanel">
                <span className="panelLabel"> Код работ </span>
                  <Field
                      name="code"
                      component={prp =>
                          <SelectInput
                              {...prp}
                              placeholder="Код работ"
                              options={props.codes}
                          />
                      }/>
              </div>
              <div  className="taskPanel">
                <span className="panelLabel"> Статья финансирования </span>
                  <span className="panelText">
                    <Field className="fieldValue" name="finance" component="input" placeholder="Статья финансирования"/>
                  </span>
              </div>
            </Container>
            <div className="taskPanel" flex="4" containerStyle={{minHeight: "200px"}}>
              <span className="panelLabel"> Описание </span>
                <span  className="panelText fullWidth">
                  <Field className="fieldValue" style={{margin:"10px", minHeight:"200px", minWidth:"90%"}}name="description" component="textarea" placeholder="Описание задачи"/>
                </span>
            </div>
            <div className={(props.activeTab !== "trud") ? "noDisplay" : "trud"}>
              <TaskTrudTabContainer/>
            </div>
            <div className={(props.activeTab !== "comment") ? "noDisplay" : "comment"}>
              <TaskCommentsTabContainer task={task}/>
            </div>
        </Container>
        {addTrudButton(task)}
        <AddTrudModalContainer isModalOpen={props.isTrudModalOpen} closeModal={props.closeModal.bind(this)}
          onSubmit={props.handleTrudSubmit.bind(this, task)} containerStyle={{maxHeight: '0'}}/>
      </Container>
    </form>
    )
  }
}
}

let taskForm = reduxForm({
  form: "taskInfoDialogForm"
})(TaskInfoComponent);

taskForm = connect(
  state => {
    return ({
    initialValues: state.taskView
  })}
)(taskForm)

export default taskForm;