import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import calendar from "../../Icons/calendar.svg";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {connect} from 'react-redux';
import AddTrudModalContainer from "../../containers/ModalContainers/AddTrudModalContainer";
import SelectInput from "../formComponents/SelectInput";
import DPicker from "../formComponents/DatePicker";
import helpers from "./taskHelpers";
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {debounce} from "../../helperFunctions";
import TaskCommentsTabContainer from "../../containers/TaskCommentsTabContainer";

const NameField = ({input}) => {
    return (<input {...input}   className="fieldValue taskHeader" placeholder="Название"/>);
  }

const DescriptionField = ({input}) => {
    return (<textarea {...input}  placeholder="Описание задачи" style={{margin:"10px", minHeight:"100px", minWidth:"90%"}}/>);
}

const WorkCodeField = ({codes,debouncedUpdate}) => (
  <Field
      name="code"
      newOnChange={debouncedUpdate}
      component={prp =>
          <SelectInput
              {...prp}
              placeholder="Код работ"
              options={codes}
          />
      }/>
);

const FinancesField = ({finances,debouncedUpdate}) => (
  <Field
      name="finance"
      newOnChange={debouncedUpdate}
      component={prp =>
          <SelectInput
              {...prp}
              placeholder="Статья финансирования"
              options={finances}
          />
      }/>
);


const codeBlockStyle = {
  minHeight: "76px"
}

const headerBlockStyle = {
  minHeight: "56px"
}

const descriptionBlockStyle = {
  minHeight: "200px"
}


const  LaborInfoComponent =  class newLaborInfo extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     open: false,
     executorsFieldActive: false
    };
    this.handleDebounce = debounce(this.handleEdit, 500);
  }
  handleEdit(e) {
    setTimeout(() => {this.refs.sbmt.click()});
  }
  render () {
    const props=this.props;
    const labor = props.labor;
    const {handleSubmit} = props;
    if(!labor.description) {
      return <div/>;
    } else {
      return (
        <form onSubmit={handleSubmit} onChange={this.handleDebounce.bind(this)} style={{display:"flex", flexDirection:"column", height: "100%"}}>
          <Container vertical={true}>
            <div className="infoHeader" flex="1">
              <Container style={{justifyContent: "space-between"}}>
                <div ref="executorsSelect" className="infoHeaderBlock" style={{display: 'flex', justifyContent: "flex-begin"}}>
                  <div>
                    <img className="user" src={calendar} alt="logo" />
                    <Field name="startDate" newOnChange={this.handleEdit.bind(this)} component={DPicker}/>
                  </div>
                </div>
              </Container>
            </div>
            <Container vertical={true} flex="11" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
                <h2 flex="1" containerStyle={headerBlockStyle} style={{margin:"5px", marginBottom: "20px"}}>
                  <Field name="description"  component={NameField} />
                </h2>
                <Container flex="3" containerStyle={codeBlockStyle}>
                  <div className="taskPanel">
                    <span className="panelLabel"> Код работ </span>
                      <WorkCodeField codes={this.props.codes} debouncedUpdate={this.handleEdit.bind(this)}/>
                  </div>
                  <div  className="taskPanel">
                    <span className="panelLabel"> Статья финансирования </span>
                        <FinancesField finances={this.props.finances} debouncedUpdate={this.handleEdit.bind(this)}/>
                  </div>
                </Container>
                <div>
                  <TaskCommentsTabContainer sendComment={props.sendComment.bind(this, labor)} task={labor}/>
                </div>
            </Container>
            <AddTrudModalContainer isModalOpen={props.isTrudModalOpen} closeModal={props.closeModal.bind(this)}
              onSubmit={props.handleTrudSubmit.bind(this, task)} containerStyle={{maxHeight: '0'}}/>
          </Container>
          <input type="submit"  ref="sbmt" style={{display:"none"}}/>
        </form>
        )
      }
    }
}

let laborForm = reduxForm({
  form: "laborInfoDialogForm",
  enableReinitialize: true
})(LaborInfoComponent);

const selector = formValueSelector('laborInfoDialogForm')
taskForm = connect(
  state => {
    return ({
    initialValues: state.laborView
  })}
)(laborForm)

export default laborForm;