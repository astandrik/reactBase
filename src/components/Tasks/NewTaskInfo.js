import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import calendar from "../../Icons/calendar.svg";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import AddTrudModalContainer from "../../containers/ModalContainers/AddTrudModalContainer";
import { Field, reduxForm } from 'redux-form'
import FlatButton from 'material-ui/FlatButton';
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

class SelectInput extends React.Component {
    onChange(event) {
        if (this.props.input.onChange) {
            this.props.input.onChange(event.value); // <-- To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
        }
    }

    render() {
        return (
            <Select
                {...this.props}
                value={this.props.input.value || ''}
                onBlur={() => this.props.input.onBlur(this.props.input.value)}
                onChange={this.onChange.bind(this)}
                options={this.props.options} // <-- Receive options from the form
            />
        );
    }
}

const DPicker = ({ input, label, meta: { touched, error } }) => {
  const selected = input.value ? moment(input.value) : null;
    return (
        <DatePicker
           selected={selected}
            onChange={input.onChange}
        />
      );
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
          <div className="infoHeaderBlock" style={{display: 'flex', justifyContent: "flex-begin"}}>
            <span>{task.manager}</span>
            <div>
              <img className="user" src={calendar} alt="logo" />
              <Field name="startDate" component={DPicker}/>
            </div>
          </div>
          <div/>
        </Container>
      </div>
      <Container vertical={true} flex="6" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
          <h2 flex="1" style={{margin:"5px", marginBottom: "20px"}}>
            <Field name="name" component="input" placeholder="Название задачи"/>
          </h2>
          <Container flex="3">
            <div className="taskPanel">
              <span className="panelLabel"> Код работ </span>
              <Field
    name="code"
    component={prp =>
        <SelectInput
            {...prp}
            options={props.codes}
        />
    }/>
            </div>
            <div  className="taskPanel">
              <span className="panelLabel"> Статья финансирования </span>
              <span className="panelText">
                <Field name="finance" component="input" placeholder="Статья финансирования"/>
              </span>
            </div>
          </Container>
          <div className="taskPanel" flex="4" containerStyle={{minHeight: "200px"}}>
            <span className="panelLabel"> Описание </span>
            <span  className="panelText">
              <Field style={{margin:"10px", minHeight:"200px", minWidth:"90%"}}name="description" component="textarea" placeholder="Описание задачи"/>
            </span>
          </div>
      </Container>
      <FlatButton type="submit" label="Создать" />
      </Container>
      </form>
    )
}
}

export default reduxForm({
  form: "newTaskInfoDialogForm"
})(newTaskInfoComponent);