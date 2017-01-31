import React, { Component } from 'react';
import {StateStructureContainer} from "../containers/Containers";
import Container from "../components/Container";


const containerTaskListContainerStyles = {
    flex:"10",
    overflow: "auto"
}

const TaskListContainerStyles = {
  padding: "10px 20px",
  height: "calc(100% - 20px)"
}

const StateStructureList = () => {
  return (
  <Container vertical={true} style={{height:"100%"}} >
    <div containerStyle={containerTaskListContainerStyles} style={TaskListContainerStyles}>
      <StateStructureContainer />
    </div>
  </Container>
  )
}


export {StateStructureList};
