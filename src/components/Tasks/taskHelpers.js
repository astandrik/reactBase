import React from "react";
import next from "../../Icons/next.svg";
import MenuItem from 'material-ui/MenuItem';
import ReactTooltip from 'react-tooltip'
let helpers = {};


helpers.generateComments = function(comments = []) {
  const makeCommentBlock = function(comment) {
    return (
      <div className="commentBlock" key={comment.id}>
        <span>{comment.author.name}</span>
        <span style={{ marginLeft:"5px", fontWeight:"bold"}}>{comment.comment}</span>
      </div>
    )
  }
  let commentBlocks = [];
  for(var i = 0; i < comments.length; i++) {
    commentBlocks[i] = makeCommentBlock(comments[i]);
  }
  return commentBlocks;
}


helpers.createExecutors = function(executors) {
  let executorDivs = [];
  if(executors) {
    executors.forEach((x,i) => {
      const name = x.name.split(' ').map(x=>x[0].toUpperCase());
      executorDivs.push(<div className="singleExecutor" key={x.id}><span data-tip={x.name}>{name}</span><ReactTooltip place="top" type="dark" effect="float"/></div>)
    });
  }
  return executorDivs;
}

helpers.generateTasks = function(propsTasks,props) {
  let tasks = [];
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
          <div>
            <div className="taskStatusTree">{item.status}</div>
            {helpers.createExecutors(item.executors)}
            <img className={"clickable-image next " + (item.opened? 'opened' : 'closed') + (!hasChildren ? " non-visible" : " visible")} onClick={props.toggleTaskOpen.bind(this,item.id)}  src={next}/>
          </div>
        </div>
    );
    if(hasChildren) {
      children = helpers.generateTasks(item.children, props);
      elem = wrapTaskContainer(elem, children)
    }
    tasks.push(elem);
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

helpers.generateTaskContainers = function (taskTree, props) {
  let taskContainers = [];
  for(var i = 0; i < taskTree.length; i++) {
    let closed = false;
    if(!props.tasksOpened[i]) {
      closed = true;
    }
    let tasks = helpers.generateTasks(taskTree[i].children,props);
    taskContainers.push(
      <div className="taskContainer" key={taskTree[i].name}>
        <div style={{marginTop:"10px"}}>
          <div className="taskListContainer">
            <span style={{fontWeight: "bold"}}>{taskTree[i].name}</span>
            <img className={"clickable-image next " + (!closed? 'opened' : 'closed')} onClick={props.toggleOpen.bind(this,i)}  src={next}/>
          </div>
          <div className={"tasks " + (!closed? 'opened' : 'closed')}>
            {tasks}
          </div>
        </div>
      </div>
    )
  }
  return taskContainers;
}

helpers.createExecutors = function(executors) {
  let executorDivs = [];
  if(executors) {
    executors.forEach((x,i) => {
      const name = x.name.split(' ').map(x=>x[0].toUpperCase());
      executorDivs.push(<div className="singleExecutor" key={x.id}><span data-tip={x.name}>{name}</span><ReactTooltip place="top" type="dark" effect="float"/></div>)
    });
  }
  return executorDivs;
}

export default helpers;