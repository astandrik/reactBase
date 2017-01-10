import React from "react"
import Modal from 'react-modal';
import Container from "../Container";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import close from "../../Icons/delete.svg";
import 'react-datepicker/dist/react-datepicker.css';
import { Field, reduxForm } from 'redux-form'
import "../styles/Modal.css";
import SelectInput from "../formComponents/SelectInput";
import DPicker from "../formComponents/DatePicker";
import calendar from "../../Icons/calendar.svg";

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
  >
  <img role="presentation"  className="clickable-image close-modal" onClick={() => {props.closeModal.bind(this)();}}  src={close}/>
  <form className="modalForm" onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
  <Container vertical="true" >
    <h2>{props.trudTask ? props.trudTask.title : ""}</h2>
      <div flex="2">
        <Field style={{margin:"10px 0", minHeight:"20px", minWidth:"150px"}} name="hours" component="input" placeholder="Количество часов"/>
      </div>
      <Container flex="2">
        <Field
            name="code"
            component={prp =>
                <SelectInput
                    {...prp}
                    placeholder="Код работ"
                    options={props.codes}
                />
            }/>
          <div className="taskDate">
            <img className="rightCalendar" src={calendar} alt="logo" />
            <Field name="startDate" component={DPicker}/>
            <span> Дата: </span>
          </div>
      </Container>
      <div flex="5">
        <Field name="comment" component={commentField}/>
       </div>
      <FlatButton style={{float:"right"}} type="submit" label="Сохранить" />
  </Container>
  </form>
  </Modal>
  )
}

export default reduxForm({
  form: "trudDialogForm"
})(dialog);