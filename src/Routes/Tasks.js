import React, { Component } from 'react';
import {TaskListContainer} from "../containers/Containers";
import Container from "../components/Container";


const menuItems = [
  {id: 1, text: "Выполненные"},
  {id: 2, text: "Невыполненные"},
  {id: 3, text: "Выполняемые"}
]


const containerTaskListContainerStyles = {
    flex:"10",
    overflow: "auto"
}

const TaskListContainerStyles = {
  padding: "10px 20px",
  height: "calc(100% - 20px)"
}

const tabs = [
  {to: "/tasks/table", title: "Таблица"},
  {to: "/tasks/list", title: "Список"}
]

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
    this.state = {text: 'hui'};
  }

  render() {
    return (
        <Container className="global-body-container" flex="8" container={{overflow:"auto"}}>
          {this.props.children}
        </Container>
    );
  }
}

export {Tasks,TaskList, tabs};
