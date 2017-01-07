import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import calendar from "../../Icons/calendar.svg";
import moment from 'moment';
import AddTrudModalContainer from "../../containers/ModalContainers/AddTrudModalContainer";
import { Field, reduxForm } from 'redux-form'
import FlatButton from 'material-ui/FlatButton';
import SelectInput from "../formComponents/SelectInput";
import {connect} from 'react-redux';
import DPicker from "../formComponents/DatePicker";


const codeBlockStyle = {
  minHeight: "76px"
}

const headerBlockStyle = {
  minHeight: "56px"
}

const descriptionBlockStyle = {
  minHeight: "269px"
}

const newTaskInfoComponent = class newTaskInfo extends React.Component {
    render () {
  const props=this.props;
  const task = props.task;
  const {handleSubmit} = props;
  return (
    <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", height: "100%"}}>
        <Container vertical={true}>
      <div className="infoHeader" flex="1">
        <Container style={{justifyContent: "space-between"}}>
          <div className="infoHeaderBlock fullWidth" style={{display: 'flex', justifyContent: "flex-begin"}}>
            <Field
            name="executors"
            component={prp =>
                <SelectInput
                    multi={true}
                    {...prp}
                    placeholder="Исполнители"
                    options={props.executors}
                />
            }/>
            <div>
              <img className="user" src={calendar} alt="logo" />
              <Field name="startDate" component={DPicker}/>
            </div>
          </div>
        </Container>
      </div>
      <Container vertical={true} flex="6" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
          <h2 containerStyle={headerBlockStyle} flex="1" style={{margin:"5px", marginBottom: "20px"}}>
            <Field name="name" className="fieldValue taskHeader" component="input" placeholder="Название задачи"/>
          </h2>
          <Container containerStyle={codeBlockStyle} flex="3">
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
          <div className="taskPanel" flex="4" containerStyle={{minHeight: "270px"}}>
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
    return ({
    initialValues:  {
      executors: [],
      parent_id: state.taskView.parent_id
    }
  })}
)(taskForm)

export default taskForm;