import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import TaskTrudTabContainer from "../../containers/TaskTrudTabContainer";
import TaskCommentsTabContainer from "../../containers/TaskCommentsTabContainer";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {connect} from 'react-redux';
import AddTrudModalContainer from "../../containers/ModalContainers/AddTrudModalContainer";
import DPicker from "../formComponents/DatePicker";
import helpers from "./taskHelpers";
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {debounce} from "../../helperFunctions";
import {WorkCodeField, FinancesField,ExecutorsSelectField,NameField, DescriptionField, Panel} from "../formComponents/ReusableComponents";
import Icon from "../../Icons/Icon";




const ImagePanel = ({chooseTrudTab, chooseCommentTab, openPopover,activePanel}) => (
  <div style={{display: 'flex', justifyContent: "flex-end"}}>
    <div style={{marginRight:"15px", display: "flex", flexDirection:"row"}}>
      <Icon name="clock" className={`clickable-image clock ${activePanel=="trud" ? 'active' : ''}`} onClick={chooseTrudTab}/>
      <Icon name="comment" className={`clickable-image comment ${activePanel=="comment" ? 'active' : ''}`} onClick={chooseCommentTab}/>
    </div>
    <div style={{width:"1px", borderRight: "1px solid black"}}></div>
    <div style={{marginLeft:"15px"}}>
      <Icon className="clickable-image ellipsis" onClick={openPopover} name="ellipsis" />
    </div>
  </div>
);

const addTrudButtonF = (props) => ((task) => (
  <div flex="2" className={"addTrudButtonContainer " + (props.activeTab !== "trud" ? "noDisplay" : "")}>
    <div className="addTrudButton" onClick={props.openTrudModal.bind(this, task)}>
      Добавить трудозату
    </div>
  </div>
));

const popoverMenu = (props, context) => {
  return(
  <Popover
         open={context.state.open}
         anchorEl={context.refs.ellipsis}
         anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
         targetOrigin={{horizontal: 'left', vertical: 'top'}}
         onRequestClose={context.handleRequestClose}
       >
         <Menu>
           <MenuItem onClick={props.handleAddNewSubTask.bind(this, props.task)} primaryText="Cоздать подзадачу" />
         </Menu>
       </Popover>
     )
}

const codeBlockStyle = {
  minHeight: "76px"
}

const headerBlockStyle = {
  minHeight: "56px"
}

const descriptionBlockStyle = {
  minHeight: "200px"
}


const  TaskInfoComponent =  class newTaskInfo extends React.Component {
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
  openPopover() {
    this.setState({open: true})
  }
  activateExecutorsField() {
    this.setState({executorsFieldActive: true});
  }
  deactivateExecutorsField() {
    this.setState({executorsFieldActive: false})
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  render () {
    const props=this.props;
    const task = props.task;
    const {handleSubmit,executorsFromForm} = props;
    const popover = popoverMenu(props, this);
    const addTrudButton = addTrudButtonF(props);
    const executorNames = helpers.createExecutors(executorsFromForm);
    let executorsField = "";
    if(this.state.executorsFieldActive) {
      executorsField = <ExecutorsSelectField executors={props.executors} debouncedUpdate={this.handleEdit.bind(this)}
        deactivateExecutorsField={this.deactivateExecutorsField.bind(this)}/>
    } else {
      executorsField = (<div className="executorNames" onClick={this.activateExecutorsField.bind(this)}>{executorNames}</div>);
    }
    if(!task.name) {
      return <div/>;
    } else {
      return (
        <form onSubmit={handleSubmit} onChange={this.handleDebounce.bind(this)} style={{display:"flex", flexDirection:"column", height: "100%"}}>
          {popover}
          <Container vertical={true}>
            <div className="infoHeader" flex="1">
              <Container style={{justifyContent: "space-between"}}>
                <div ref="executorsSelect" className="infoHeaderBlock" style={{display: 'flex', justifyContent: "flex-begin"}}>
                  {executorsField}
                  <div style={{display:"flex", flexDirection:"row"}}>
                    <Icon className="user" name="calendar" />
                    <Field name="startDate" newOnChange={this.handleEdit.bind(this)} component={DPicker}/>
                  </div>
                </div>
                <div ref="ellipsis">
                  <ImagePanel activePanel={props.activeTab} chooseTrudTab={props.chooseCurrentTaskTab.bind(this, 'trud')} chooseCommentTab={props.chooseCurrentTaskTab.bind(this, 'comment')}
                    openPopover={this.openPopover.bind(this)}/>
                </div>
              </Container>
            </div>
            <Container vertical={true} flex="11" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
                <h2 flex="1" containerStyle={headerBlockStyle} style={{margin:"5px", marginBottom: "20px"}}>
                  <Field name="name"  component={NameField} />
                </h2>
                <Container flex="3" containerStyle={codeBlockStyle}>
                  <Panel label="Код работ">
                    <WorkCodeField codes={this.props.codes} debouncedUpdate={this.handleEdit.bind(this)}/>
                  </Panel>
                  <Panel label="Статья финансирования">
                    <FinancesField finances={this.props.finances} debouncedUpdate={this.handleEdit.bind(this)}/>
                  </Panel>
                </Container>
                <div className="taskPanel" flex="4" containerStyle={descriptionBlockStyle}>
                  <span className="panelLabel"> Описание </span>
                    <span  className="panelText fullWidth">
                      <Field className="fieldValue" name="description" component={DescriptionField}/>
                    </span>
                </div>
                <div className={(props.activeTab !== "trud") ? "noDisplay" : "trud"}>
                  <TaskTrudTabContainer type="task"/>
                </div>
                <div className={(props.activeTab !== "comment") ? "noDisplay" : "comment"}>
                  <TaskCommentsTabContainer sendComment={props.sendComment.bind(this, task)} task={task}/>
                </div>
            </Container>
            {addTrudButton(task)}
            <AddTrudModalContainer isModalOpen={props.isTrudModalOpen} closeModal={props.closeModal.bind(this)}
              onSubmit={props.handleTrudSubmit.bind(this, task)} containerStyle={{maxHeight: '0'}}/>
          </Container>
          <input type="submit"  ref="sbmt" style={{display:"none"}}/>
        </form>
        )
      }
    }
}

let taskForm = reduxForm({
  form: "taskInfoDialogForm",
  enableReinitialize: true
})(TaskInfoComponent);

const selector = formValueSelector('taskInfoDialogForm');
taskForm = connect(
  state => {
    const executorsForm = selector(state, 'executors');
    let executorsFromForm = [];
    if(executorsForm) {
      executorsFromForm = executorsForm.map(x=>({id:x.value, name: x.label}));
    }
    return ({
    initialValues: state.taskView,
    executorsFromForm
  })}
)(taskForm);

export default taskForm;