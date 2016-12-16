import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import next from "../Icons/next.svg";
import {RightPanelContainer} from "../containers/Containers";
import Container from "./Container";
import "./styles/TaskList.css";

const buttonContainerStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
}

const fullSize = {
  width:"100%",
  height: "100%"
}

const generateTasks = function(propsTasks,props) {
  let tasks = [[],[],[]];
  propsTasks = propsTasks || [];
  propsTasks.forEach((item, i) => {
    const hasChildren = item.children && item.children.length > 0;
    let children = [];
    let elem = {};
    if(hasChildren) {
      children = generateTasks(item.children, props);
      elem = (
        <div className="taskContainer" key={item.id}>
          <div className={"single-task " + (item.active ? " active" : "")} key={item.id}>
            <span className="taskLabel" onClick={props.loadTask.bind(this,item.id)}>{item.title}</span>
            <img className={"clickable-image next " + (item.opened? 'opened' : 'closed') + (!hasChildren ? " non-visible" : " visible")} onClick={props.toggleTaskOpen.bind(this,item.id)}  src={next}/>
          </div>
          <div className={"tasks " + (item.opened? 'opened' : 'closed')}>
            {children}
          </div>
        </div>
      )
    } else {
      elem = (
        <div className={"single-task " + (item.active ? " active" : "")} key={item.id}>
          <span className="taskLabel" onClick={props.loadTask.bind(this,item.id)}>{item.title}</span>
          <img className={"clickable-image next " + (item.opened? 'opened' : 'closed') + (!hasChildren ? " non-visible" : " visible")} onClick={props.toggleTaskOpen.bind(this,item.id)}  src={next}/>
        </div>
      );
    }
    tasks[item.type-1].push(elem);
  });
  return tasks;
}

const generateMenuItems = function(menuItems) {
  let items = [];
  menuItems.forEach((item, i) => {
    items.push(
      <MenuItem value={item.id} key={item.id} primaryText={item.text}/>
    );
  });
  return items;
}

function generateTaskContainers(tasks, props) {
  const taskTypes = ["Нераспределенные задачи", "Мои задачи", "Задачи подчиненных"]
  let taskContainers = [];
  for(var i = 0; i < taskTypes.length; i++) {
    let closed = false;
    if(!props.tasksOpened[i]) {
      closed = true;
    }
    taskContainers.push(
      <div className="taskContainer" key={taskTypes[i]}>
        <div style={{marginTop:"10px"}}>
          <div className="taskListContainer">
            <span style={{fontWeight: "bold"}}>{taskTypes[i]}</span>
            <img className={"clickable-image next " + (!closed? 'opened' : 'closed')} onClick={props.toggleOpen.bind(this,i)}  src={next}/>
          </div>
          <div className={"tasks " + (!closed? 'opened' : 'closed')}>
            {tasks[i]}
          </div>
        </div>
      </div>
    )
  }
  return taskContainers;
}

export default class TaskList extends React.Component {

  render() {
    let propsTasks = this.props.tasks;
    let tasks = generateTasks(propsTasks, this.props);
    let menuItems = this.props.menuItems;
    let items = generateMenuItems(menuItems);
    let taskContainers = generateTaskContainers(tasks, this.props);
    return (
      <Container>
        <div className="tasksContainer" style={fullSize}>
          <div style={buttonContainerStyles}>
            <div>
              <RaisedButton className="addButton" label="Добавить" />
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
        <div className={"rightPanelContainer " + (this.props.rightPanelStatus ? "opened" : "closed")} style={fullSize}>
          <RightPanelContainer onClose={this.props.onRightClose}>
            <h1> HUI </h1>
          </RightPanelContainer>
        </div>
      </Container>
    );
  }
}