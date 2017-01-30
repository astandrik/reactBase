import React from "react"
import Modal from 'react-modal';
import Container from "../Container";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import close from "../../Icons/delete.svg";
import 'react-datepicker/dist/react-datepicker.css';
import { Field, reduxForm } from 'redux-form'
import "../styles/Modal.css";
import DPicker from "../formComponents/DatePicker";
import calendar from "../../Icons/calendar.svg";
import moment from 'moment';
import {
    connect
} from 'react-redux';
import {WorkCodeField, FinancesField, HoursField, Panel} from "../formComponents/ReusableComponents";

const commentField = ({ input, label, meta: { touched, error } }) => {
  return (
    <TextField
     hintText="Написать комментарий"
     multiLine={true}
     rows={2}
     rowsMax={6}
     fullWidth={true}
     {...input}/>
  );
}



const dialog = (props) => {
  const { handleSubmit } = props;

  return (
    <Modal
    isOpen={props.isModalOpen}
    contentLabel="Modal"
    className="large-modal"
  >
  <img role="presentation"  className="clickable-image close-modal" onClick={() => {props.closeModal.bind(this)();}}  src={close}/>
  <form className="modalForm" onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
  <Container vertical="true" >
       <h2>{props.trudTask ? props.trudTask.title : ""}</h2>
       <Container flex="2" className="responsive-vertical">
         <Panel label="Количество часов">
           <Field name="hours"  component={HoursField} />
         </Panel>
          <Panel label="Код работ">
            <WorkCodeField codes={props.codes}/>
          </Panel>
      </Container>
      <div className="taskDate">
        <span> Дата: </span>
        <Field name="startLaborDate" component={DPicker}/>
        <img className="rightCalendar" src={calendar} alt="logo" />
      </div>
      <div flex="5">
        <Field name="comment" component={commentField}/>
       </div>
      <FlatButton style={{float:"right"}} type="submit" label="Сохранить" />
  </Container>
  </form>
  </Modal>
  )
}

let dialogForm = reduxForm({
  form: "trudDialogForm",
  enableReinitialize: true
})(dialog);

function swapDate(d) {
  const a = d.split('.');
  return a[1] + "." + a[0];
}

dialogForm = connect(
  state => {
    const date = state.currentDay ? (`${swapDate(state.currentDay)}.${state.currentWeek.getFullYear()}`).split(".").join("/") : new Date();
    const currentDate = moment(date);
    return ({
    initialValues: Object.assign(state.currentAddingTrudTask, {startLaborDate: currentDate})
  })}
)(dialogForm);

export default dialogForm;