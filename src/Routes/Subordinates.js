import React, { Component } from 'react';
import {SubordinatesTableContainer} from "../containers/Containers";
import Container from "../components/Container";


const containerTaskListContainerStyles = {
    flex:"10",
    overflow: "auto"
}

const TaskListContainerStyles = {
  padding: "10px 20px",
  height: "calc(100% - 20px)"
}

const SubordinatesTable = () => {
    return (
      <Container vertical={true} style={{height:"100%"}} >
        <div containerStyle={containerTaskListContainerStyles} style={TaskListContainerStyles}>
          <SubordinatesTableContainer  />
        </div>
      </Container>
    )
}

class Subordinates extends Component {
  render() {
    return (
        <Container className="global-body-container" flex="8" container={{overflow:"auto"}}>
          <SubordinatesTable/>
        </Container>
    );
  }
}

export {Subordinates};
