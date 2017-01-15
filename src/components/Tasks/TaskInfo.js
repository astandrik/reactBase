import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import calendar from "../../Icons/calendar.svg";
import ellipsis from "../../Icons/ellipsis.svg";
import comment from "../../Icons/speech-bubbles-comment-option.svg";
import clock from "../../Icons/clock.svg";
import TaskTrudTabContainer from "../../containers/TaskTrudTabContainer";
import TaskCommentsTabContainer from "../../containers/TaskCommentsTabContainer";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {connect} from 'react-redux';
import AddTrudModalContainer from "../../containers/ModalContainers/AddTrudModalContainer";
import SelectInput from "../formComponents/SelectInput";
import DPicker from "../formComponents/DatePicker";
import helpers from "./taskHelpers";
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {debounce} from "../../helperFunctions";

const NameField = ({input}) => {
    return (<input {...input}   className="fieldValue taskHeader" placeholder="Название задачи"/>);
  }

const DescriptionField = ({input}) => {
    return (<textarea {...input}  placeholder="Описание задачи" style={{margin:"10px", minHeight:"100px", minWidth:"90%"}}/>);
}

const ExecutorsSelectField = ({executors, deactivateExecutorsField,debouncedUpdate}) => (
  <Field
  name="executors"
  newOnBlur={deactivateExecutorsField}
  newOnChange={debouncedUpdate}
  component={prp =>
      <SelectInput
          multi={true}
          {...prp}
          placeholder="Исполнители"
          options={executors}
          autofocus={true}
      />
  }/>
);

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

const ImagePanel = ({chooseTrudTab, chooseCommentTab, openPopover}) => (
  <div style={{display: 'flex', justifyContent: "flex-end"}}>
    <div style={{marginRight:"15px"}}>
      <img className="clickable-image clock" onClick={chooseTrudTab} src={clock} alt="logo" />
      <img className="clickable-image comment" onClick={chooseCommentTab} src={comment} alt="logo" />
    </div>
    <div style={{width:"1px", borderRight: "1px solid black"}}></div>
    <div style={{marginLeft:"15px"}}>
      <img className="clickable-image ellipsis" onClick={openPopover} src={ellipsis} alt="logo" />
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
                  <div>
                    <img className="user" src={calendar} alt="logo" />
                    <Field name="startDate" newOnChange={this.handleEdit.bind(this)} component={DPicker}/>
                  </div>
                </div>
                <div ref="ellipsis">
                  <ImagePanel chooseTrudTab={props.chooseCurrentTaskTab.bind(this, 'trud')} chooseCommentTab={props.chooseCurrentTaskTab.bind(this, 'comment')}
                    openPopover={this.openPopover.bind(this)}/>
                </div>
              </Container>
            </div>
            <Container vertical={true} flex="11" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
                <h2 flex="1" containerStyle={headerBlockStyle} style={{margin:"5px", marginBottom: "20px"}}>
                  <Field name="name"  component={NameField} />
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
                <div className="taskPanel" flex="4" containerStyle={descriptionBlockStyle}>
                  <span className="panelLabel"> Описание </span>
                    <span  className="panelText fullWidth">
                      <Field className="fieldValue" name="description" component={DescriptionField}/>
                    </span>
                </div>
                <div className={(props.activeTab !== "trud") ? "noDisplay" : "trud"}>
                  <TaskTrudTabContainer/>
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
)(taskForm)

export default taskForm;