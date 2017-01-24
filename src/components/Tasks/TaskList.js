import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import {RightPanelContainer} from "../../containers/Containers";
import Container from "../Container";
import "../styles/TaskList.css";
import TaskInfoContainer from "../../containers/TaskInfoContainer";
import NewTaskInfoContainer from "../../containers/NewTaskInfoContainer";
import LaborInfoContainer from "../../containers/LaborInfoContainer";
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

let tasksDict = [];
let tasksIdDict = [];

function fillTasksDict(tasks) {
  tasks.forEach((x) => {
    tasksDict[x.globalIndex] = x;
    if(!tasksIdDict[x.id]) {
      tasksIdDict[x.id] = [x];
    } else {
      tasksIdDict[x.id].push(x);
    };
    if(x.children) {
      fillTasksDict(x.children);
    }
  })
}

function findAllTaskInTreeByIndexes(globalIndexes) {
  if(globalIndexes[0] == -1) {
    return [];
  } else {
    let elems = globalIndexes.map(x => tasksDict[x]);
    return elems;
  }
}

function findAllTaskInTreeByIds(ids) {
    if(ids[0] == -1) {
      return [];
    } else {
      let elems = ids.reduce((sum,current) => sum.concat(tasksIdDict[current]), []);
      return elems;
    }
}

const generateMenuItems = helpers.generateMenuItems;

function deactivateTasks() {
    for(var e in tasksDict) {
        tasksDict[e].active = false;
        tasksDict[e].opened = false;
    }
}

const generateTaskContainers = helpers.generateTaskContainers;

export default class TaskList extends React.Component {
  render() {
    tasksDict = [];
    let propsTasks = this.props.tasks;
    fillTasksDict(propsTasks);
    deactivateTasks();
    if(this.props.activeIndexes.taskId !== -1) {
      let items_ = findAllTaskInTreeByIds([this.props.activeIndexes.taskId]);
      items_.forEach(x=> x.active = true);
    }
    if(this.props.openedTasks.length > 0) {
      let items_ = findAllTaskInTreeByIndexes(this.props.openedTasks);
      items_.forEach(x=> x.opened = true);
    }
    let menuItems = this.props.menuItems;
    let items = generateMenuItems(menuItems);
    let taskContainers = generateTaskContainers(propsTasks, this.props);
    let rightPanel = <div containerStyle={{display:"none"}}/>;
    const handleChange = (event, index, value) => this.props.filterChange(value);
    if(this.props.rightPanelStatus && this.props.laborView) {
      rightPanel = (
        <div className={"rightPanelContainer " + (this.props.rightPanelStatus ? "opened" : "closed")} style={fullSize}>
          <RightPanelContainer>
            <LaborInfoContainer labor={this.props.laborView} onSubmit={this.props.handleEditLaborSubmit}/>
          </RightPanelContainer>
        </div>
      )
    } else if(this.props.rightPanelStatus && this.props.taskView && this.props.taskView.type === "new") {
      rightPanel = (
        <div className={"rightPanelContainer " + (this.props.rightPanelStatus ? "opened" : "closed")} style={fullSize}>
          <RightPanelContainer>
            <NewTaskInfoContainer task={this.props.taskView} onSubmit={this.props.handleNewTaskSubmit}/>
          </RightPanelContainer>
        </div>
      )
    } else if(this.props.rightPanelStatus) {
      rightPanel= (
        <div className={"rightPanelContainer " + (this.props.rightPanelStatus ? "opened" : "closed")} style={fullSize}>
          <RightPanelContainer>
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
              <DropDownMenu onChange={handleChange} className="taskDropdown" value={this.props.treeFilter}>
                {items}
              </DropDownMenu>
            </div>
          </div>
          <div style={{marginTop:"20px"}}>
            {taskContainers}
          </div>
        </div>
        <div className={`splitter ${(this.props.rightPanelStatus ? "" : "noDisplay")}`}/>
        {rightPanel}
      </Container>
    );
  }
}