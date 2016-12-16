import React from "react";
import next from "../../Icons/next.svg";
import MenuItem from 'material-ui/MenuItem';
let helpers = {};


helpers.generateComments = function(comments) {
  const makeCommentBlock = function(comment) {
    return (
      <div className="commentBlock" key={comment.id}>
        <span>{comment.author}</span>
        <span style={{ marginLeft:"5px", fontWeight:"bold"}}>{comment.text}</span>
      </div>
    )
  }
  let commentBlocks = [];
  for(var i = 0; i < comments.length; i++) {
    commentBlocks[i] = makeCommentBlock(comments[i]);
  }
  return commentBlocks;
}

helpers.generateTasks = function(propsTasks,props) {
  let tasks = [[],[],[]];
  propsTasks = propsTasks || [];
  propsTasks.forEach((item, i) => {
    const hasChildren = item.children && item.children.length > 0;
    let children = [];
    let elem = {};
    let wrapTaskContainer = (task,children) => {
      return (
          <div className="taskContainer" key={item.id}>
          {task}
            <div className={"tasks " + (item.opened? 'opened' : 'closed')}>
              {children}
            </div>
          </div>
      )
    }
    elem = (
        <div className={"single-task " + (item.active ? " active" : "")} key={item.id}>
          <span className="taskLabel" onClick={props.loadTask.bind(this,item.id)}>{item.title}</span>
          <img className={"clickable-image next " + (item.opened? 'opened' : 'closed') + (!hasChildren ? " non-visible" : " visible")} onClick={props.toggleTaskOpen.bind(this,item.id)}  src={next}/>
        </div>
    );
    if(hasChildren) {
      children = helpers.generateTasks(item.children, props);
      elem = wrapTaskContainer(elem, children)
    }
    tasks[item.type-1].push(elem);
  });
  return tasks;
}

helpers.generateMenuItems =  function(menuItems) {
  let items = [];
  menuItems.forEach((item, i) => {
    items.push(
      <MenuItem value={item.id} key={item.id} primaryText={item.text}/>
    );
  });
  return items;
}

helpers.generateTaskContainers = function (tasks, props) {
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

export default helpers;