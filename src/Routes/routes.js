import Home from "./Home";
import {Tasks,TaskList, tabs} from "./Tasks";
import {TasksTable} from "./TasksTable";
import React from 'react';
import { Route } from 'react-router';
const TaskRoutes = (props) => {
  const taskEnter = () => {
    props.loadRepo.tasks();
  };
  const tableEnter = () => {
    props.loadRepo.tableData();
  };
  return (
  <Route path="tasks" onEnter={()=> {props.loadRepo.setCurrentTitle('Все задачи'); props.loadRepo.tabs(tabs);}} component={Tasks}>
    <Route path="list" onEnter={taskEnter} component={TaskList}/>
    <Route path="table" onEnter={tableEnter} component={TasksTable}/>
  </Route>
  )
}

export {Home, TaskRoutes};