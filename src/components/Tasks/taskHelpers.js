import React from "react";
import next from "../../Icons/next.svg";
import MenuItem from 'material-ui/MenuItem';
import ReactTooltip from 'react-tooltip'
import { List } from 'react-virtualized';
let helpers = {};


helpers.generateComments = function(comments = []) {
  const makeCommentBlock = function(comment) {
    return (
      <div className="commentBlock" key={comment.id}>
        <div className="headerCommentBlock"><span>{comment.author.name},</span><span style={{marginLeft:"10px"}}>{comment.date}</span></div>
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
          <span className="taskLabel" onClick={props.loadTask.bind(this,item)}>{item.title}</span>
          <div>
            <div className="taskStatusTree">{item.status}</div>
            {helpers.createExecutors(item.executors)}
            <img role="presentation"  className={"clickable-image next " + (item.opened? 'opened' : 'closed') + (!hasChildren ? " non-visible" : " visible")} onClick={props.toggleTaskOpen.bind(this,item)}  src={next}/>
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

helpers.generateTaskContainers = function (taskTree, props, height) {
  let taskContainers = [];
  let count = taskTree.length;
  if(!isNaN(parseInt(height))) {
    height = parseInt(height);
  }
  height = height - (100 + 26*count);
  let heightPerContainer = height / count;
  taskTree.sort((a,b) => a.children.length > b.children.length ? 1 : -1);
  for(var i = 0; i < taskTree.length; i++) {
    const filtered = taskTree[i].children.filter(item => (item.rawstatus === props.treeFilter) || props.treeFilter === 3)
    let tasks = helpers.generateTasks(filtered,props);
    function rowRenderer ({
      key,         // Unique key within array of rows
      index,       // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible,   // This row is visible within the List (eg it is not an overscanned row)
      style        // Style object to be applied to row (to position it)
    }) {
      return (
        <div
          key={key}
          style={style}
        >
          {tasks[index]}
        </div>
      )
    }
    let h = tasks.length * 40;
    if(h < heightPerContainer && (count-1)) {
      let remained = (heightPerContainer - h) /(count-1);
      count--;
      heightPerContainer += remained;
    } else {
      h = heightPerContainer;
    }
    taskContainers[i] = (
      <div className="taskContainer" key={taskTree[i].name}>
        <div style={{marginTop:"10px"}}>
          <div className="taskListContainer">
            <span style={{fontWeight: "bold"}}>{taskTree[i].name}</span>
            <img role="presentation"  className={"clickable-image next " + (taskTree[i].opened? 'opened' : 'closed')} onClick={props.toggleTaskOpen.bind(this,taskTree[i])}  src={next}/>
          </div>
          <div className={"tasks " + (taskTree[i].opened ? 'opened' : 'closed')}>
                    <List
            width={500}
            height={h}
            rowHeight={40}
            rowCount={tasks.length}
            rowRenderer={rowRenderer}
          />
          </div>
        </div>
      </div>
    )
  }
  return taskContainers;
}

helpers.createExecutors = function(executors) {
  let executorDivs = [];
  if(executors && executors.length > 0) {
    executors.forEach((x,i) => {
      const name = x.name.split(' ').map(x=>x[0].toUpperCase());
      executorDivs.push(<div className="singleExecutor" key={x.id}><span data-tip={x.name}>{name}</span><ReactTooltip place="top" type="dark" effect="float"/></div>)
    });
  } else {
      executorDivs.push(<div className="singleExecutor" key={-1}><span data-tip={"Не распределено"}>Н/Р</span><ReactTooltip place="top" type="dark" effect="float"/></div>)
  }
  return executorDivs;
}

export default helpers;