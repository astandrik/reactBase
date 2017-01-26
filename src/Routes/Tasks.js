import React, { Component } from 'react';
import {TaskListContainer} from "../containers/Containers";
import Container from "../components/Container";


const menuItems = [
  {id: 0, text: "Активна"},
  {id: 1, text: "Завершена"},
  {id: 3, text: "Все"}
]


const containerTaskListContainerStyles = {
    flex:"10",
    overflow: "auto"
}

const TaskListContainerStyles = {
  padding: "10px 20px",
  height: "calc(100% - 20px)"
}

const TaskList = () => {
  return (
  <Container vertical={true} style={{height:"100%"}} >
    <div containerStyle={containerTaskListContainerStyles} style={TaskListContainerStyles}>
      <TaskListContainer menuItems={menuItems} />
    </div>
  </Container>
  )
}

class Tasks extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidUpdate() {
    const type = this.props.params.type;
    this.props.route.loadRepo.setGlobalTaskType(type);
    const tabs = [
      {to: "/tasks/"+type+"/table", title: "Таблица"},
      {to: "/tasks/"+type+"/list", title: "Список"}
    ]
    this.props.route.loadRepo.tabs(tabs);
  }
  componentDidMount() {
    const type = this.props.params.type;
    this.props.route.loadRepo.setGlobalTaskType(type);
    const tabs = [
      {to: "/tasks/"+type+"/table", title: "Таблица"},
      {to: "/tasks/"+type+"/list", title: "Список"}
    ]
    this.props.route.loadRepo.tabs(tabs);        
  }
  render() {
    return (
        <Container className="global-body-container" flex="8" container={{overflow:"auto"}}>
          {this.props.children}
        </Container>
    );
  }
}

export {Tasks,TaskList};
