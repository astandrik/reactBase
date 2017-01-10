import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import {RightPanelContainer} from "../../containers/Containers";
import Container from "../Container";
import "../styles/TaskList.css";
import TaskInfoContainer from "../../containers/TaskInfoContainer";
import NewTaskInfoContainer from "../../containers/NewTaskInfoContainer";
import helpers from "./taskHelpers";
import ValidationErrorsModalContainer from "../../containers/ModalContainers/ValidationErrorsModalContainer";

const buttonContainerStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
}

const fullSize = {
  width:"100%",
  height: "100%"
}

const generateMenuItems = helpers.generateMenuItems;

const generateTaskContainers = helpers.generateTaskContainers;

export default class TaskList extends React.Component {

  render() {
    let propsTasks = this.props.tasks;
    let menuItems = this.props.menuItems;
    let items = generateMenuItems(menuItems);
    let taskContainers = generateTaskContainers(propsTasks, this.props);
    let rightPanel = <div containerStyle={{display:"none"}}/>;
    if(this.props.rightPanelStatus && this.props.taskView && this.props.taskView.type === "new") {
      rightPanel = (
        <div className={"rightPanelContainer " + (this.props.rightPanelStatus ? "opened" : "closed")} style={fullSize}>
          <RightPanelContainer onClose={this.props.onRightClose}>
            <NewTaskInfoContainer task={this.props.taskView} onSubmit={this.props.handleNewTaskSubmit}/>
          </RightPanelContainer>
        </div>
      )
    } else if(this.props.rightPanelStatus) {
      rightPanel= (
        <div className={"rightPanelContainer " + (this.props.rightPanelStatus ? "opened" : "closed")} style={fullSize}>
          <RightPanelContainer onClose={this.props.onRightClose}>
            <TaskInfoContainer task={this.props.taskView} onSubmit={this.props.handleEditTaskSubmit}/>
          </RightPanelContainer>
        </div>
      )
    }
    return (
      <Container>
        <div className="tasksContainer" style={fullSize}>
          <div style={buttonContainerStyles}>
            <div>
              <RaisedButton className="addButton" label="Добавить" onClick={this.props.handleAddNewTask}/>
            </div>
            <div>
              <DropDownMenu className="taskDropdown" value={this.props.value}>
                {items}
              </DropDownMenu>
            </div>
          </div>
          <div style={{marginTop:"20px"}}>
            {taskContainers}
          </div>
        </div>
        {rightPanel}
        <ValidationErrorsModalContainer containerStyle={{maxWidth: '0'}}/>
      </Container>
    );
  }
}