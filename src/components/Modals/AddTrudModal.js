import React from "react"
import Modal from 'react-modal';
import Container from "../Container";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'react-datepicker';
import close from "../../Icons/delete.svg";
import 'react-datepicker/dist/react-datepicker.css';
import { Field, reduxForm } from 'redux-form'
import "../styles/Modal.css";
import moment from "moment";

const DPicker = ({ input, label, meta: { touched, error } }) => {
  const selected = input.value ? moment(input.value) : null;
    return (
        <DatePicker
           selected={selected}
            onChange={input.onChange}
        />
);
}

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
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <Modal
    isOpen={props.isModalOpen}
    contentLabel="Modal"
  >
  <img className="clickable-image close-modal" onClick={() => {props.closeModal.bind(this)();}}  src={close}/>
  <form className="modalForm" onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
  <Container vertical="true" >
    <h2>{props.trudTask ? props.trudTask.title : ""}</h2>
      <div flex="2">
        <Field style={{margin:"10px", minHeight:"20px", minWidth:"150px"}} name="hours" component="input" placeholder="Количество часов"/>
      </div>
      <Container flex="2">
        <Field style={{margin:"10px", minHeight:"20px", minWidth:"150px"}} name="code" component="input" placeholder="Код работ"/>
        <Field name="startDate" component={DPicker}/>
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