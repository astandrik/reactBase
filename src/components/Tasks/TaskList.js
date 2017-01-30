import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Container from "../Container";
import "../styles/TaskList.css";
import next from "../../Icons/next.svg";
import RightTaskPanelContainer from "../../containers/RightTaskPanelContainer";
import helpers from "./taskHelpers";
import listGenerator from "../utils/listGenerator";
import Icon from "../../Icons/Icon";
import { List, AutoSizer } from 'react-virtualized';

const buttonContainerStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
}

const fullSize = {
  width:"100%",
  height: "100%"
}

const taskStatusDict = {
  0: "new-task",
  1: "completed-task",
  2: "deleted-task",
  3: "approved-task",
  4: "declined-task"
};


let tasksDict = {};
let tasksIdDict = {};

function findAllTaskInTreeByIndexes(globalIndexes) {
  if(globalIndexes[0] === -1) {
    return [];
  } else {
    let elems = globalIndexes.map(x => tasksDict[x]);
    return elems.filter(x=> x!== undefined);
  }
}

function findAllTaskInTreeByIds(ids) {
    if(ids[0] === -1) {
      return [];
    } else {
      let elems = ids.reduce((sum,current) => sum.concat(tasksIdDict[current]), []);
      return elems.filter(x=> x!== undefined);
    }
}

function deactivateTasks() {
    for(var e in tasksDict) {
        if(1) {
          tasksDict[e].active = false;
          tasksDict[e].opened = false;
        }
    }
}


const generateTaskContainers = helpers.generateTaskContainers;

  const checkBoxValues=[
    {value: "all", label:"Все задачи"},
    {value: "current", label:"Текущие задачи"},
    {value: "unaccepted", label:"Неакцептированные задачи"},
    {value: "completes", label:"Завершенные задачи"},
  ];

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  componentDidUpdate() {
    const ref = this.refs.taskTree;
    if(ref) {
      this.props.setClientHeight(ref.clientHeight);
    }
  }
  render() {
    let propsTasks = this.props.tasks;
    const props = this.props;
    if(propsTasks.length === 0) {
      return <div/>;
    }
    tasksIdDict= propsTasks.treeNormalized.byId;
    tasksDict = propsTasks.treeNormalized.byGlobalId;
    deactivateTasks();
    if(this.props.activeIndexes.taskId !== -1) {
      let items_ = findAllTaskInTreeByIds([this.props.activeIndexes.taskId]);
      items_.forEach(x=> x.active = true);
    }
    if(this.props.openedTasks.length > 0) {
      let items_ = findAllTaskInTreeByIndexes(this.props.openedTasks);
      items_.forEach(x=> x.opened = true);
    }
    const rightPanelContainerStyle = this.props.rightPanelStatus ? {} : {maxWidth: "0"};
    const rightPanelClass = this.props.rightPanelStatus  ? "" : "right-closed";
    let config = {};

    config.listItemRender = (item) => {
      return (
        <div className={(item.level === 0 ? "task-header " : "") + "single-task " +
          ` level_${item.level} ` + (item.active ? " active" : "") + " " + (taskStatusDict[item.rawstatus])} key={item.globalIndex}>
          <span className="taskLabel" onClick={props.loadTask.bind(this,item)}>{item.name}</span>
          <div>
            {item.status ?  <div className="taskStatusTree">{item.status}</div> : <div className="noDisplay"/>}
            {item.executors === undefined ? <div className="noDisplay"/> : helpers.createExecutors(item.executors)}
            <img role="presentation"  className={"clickable-image next " + (item.opened? 'opened' : 'closed') +
              (item.children.length ? " visible" : " non-visible")} onClick={props.toggleTaskOpen.bind(this,item)}  src={next}/>
          </div>
        </div>
      )
    }
    let taskContainers = listGenerator(propsTasks, this.props, config);

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
            {taskContainers[index]}
          </div>
        )
      }

    let tasksView = (
      <AutoSizer>
       {({ height, width }) => (
          <List
        width={width}
        height={height}
        rowHeight={31}
        rowCount={taskContainers.length}
        rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  )
    return (
      <Container>
        <div className="tasksContainer" style={fullSize} ref="taskTree">
          <div style={buttonContainerStyles}>
            <div>
              <RaisedButton className="addButton" label="Добавить" onClick={this.props.handleAddNewTask}/>
            </div>
          </div>
          <div style={{marginTop:"7px", height:"calc(100% - 40px)"}} className="autoresizer-list-container">
            {tasksView}
          </div>
        </div>
        <div className={`splitter ${(this.props.rightPanelStatus ? "" : "noDisplay")}`}/>
        <RightTaskPanelContainer containerStyle={rightPanelContainerStyle} className={rightPanelClass}/>
      </Container>
    );
  }
}