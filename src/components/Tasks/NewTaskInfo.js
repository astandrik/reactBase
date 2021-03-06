import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import calendar from "../../Icons/calendar.svg";
import { Field, reduxForm } from 'redux-form'
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import DPicker from "../formComponents/DatePicker";
import {WorkCodeField, FinancesField,ExecutorsSelectField, Panel,ExecutorsAsyncSelectField} from "../formComponents/ReusableComponents";


const codeBlockStyle = {
  minHeight: "76px"
}

const headerBlockStyle = {
  minHeight: "56px"
}

const descriptionBlockStyle = {
  minHeight: "270px"
}

const newTaskInfoComponent = class newTaskInfo extends React.Component {
    render () {
  const props=this.props;
  const {handleSubmit} = props;
  return (
    <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", height: "100%"}}>
        <Container vertical={true}>
      <div className="infoHeader" flex="1">
        <Container style={{justifyContent: "space-between"}}>
          <div className="infoHeaderBlock fullWidth" style={{display: 'flex', justifyContent: "flex-begin"}}>
            <ExecutorsAsyncSelectField executors={props.executors}/>
            <div>
              <img className="user" src={calendar} alt="logo" />
              <Field name="startDate" component={DPicker}/>
            </div>
          </div>
        </Container>
      </div>
      <Container vertical={true} flex="6" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
          <h2 containerStyle={headerBlockStyle} flex="1" style={{margin:"5px", marginBottom: "20px"}}>
            <Field name="name" className="fieldValue taskHeader" component="textarea" placeholder="Название задачи"/>
          </h2>
          <Container containerStyle={codeBlockStyle} flex="3">
            <Panel label="Код работ">
              <WorkCodeField codes={this.props.codes}/>
            </Panel>
            <Panel label="Статья финансирования">
              <FinancesField finances={this.props.finances}/>
            </Panel>
          </Container>
          <div className="taskPanel" flex="4" containerStyle={descriptionBlockStyle}>
            <span className="panelLabel"> Описание </span>
            <span  className="panelText fullWidth">
              <Field className="fieldValue" style={{margin:"10px", minHeight:"200px", minWidth:"90%"}}name="description" component="textarea" placeholder="Описание задачи"/>
            </span>
          </div>
      </Container>
        <div style={{borderTop:"1px solid black", minHeight: "36px"}}>
          <FlatButton type="submit" label="Создать" />
        </div>
      </Container>
      </form>
    )
}
}

let taskForm = reduxForm({
  form: "newTaskInfoDialogForm"
})(newTaskInfoComponent);

taskForm = connect(
  state => {
    let additionalParams = {};
    if(state.taskView.parent_task) {
      additionalParams.code = state.taskView.parent_task.code;
      additionalParams.finance = state.taskView.parent_task.finance;
    }
    return ({
    initialValues:  {
      executors: [],
      parent_id: state.taskView.parent_id,
      ...additionalParams
    }
  })}
)(taskForm)

export default taskForm;