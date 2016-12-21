import React, { Component } from 'react';
import {TaskTableContainer} from "../containers/Containers";
import Container from "../components/Container";



const containerTaskListContainerStyles = {
    border: "1px solid black",
    flex:"10",
    overflow: "auto"
}

const TaskListContainerStyles = {
  padding: "30px",
  height: "calc(100% - 60px)"
}


const TasksTable = () => {
    return (
      <Container vertical={true} style={{height:"100%"}} >
        <div containerStyle={containerTaskListContainerStyles} style={TaskListContainerStyles}>
          <TaskTableContainer  />
        </div>
      </Container>
    )
}

class Table extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {text: 'hui'};
  }

  render() {
    return (
        <Container style={{margin:"10px 20px 10px 20px",background:"#EEEEEE"}} width="calc(100% - 40px)" flex="8" container={{overflow:"auto"}}>
          {this.props.children}
        </Container>
    );
  }
}

export {Table,TasksTable};
