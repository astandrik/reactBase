import Home from "./Home";
import {Tasks,TaskList, tabs} from "./Tasks";
import {TasksTable} from "./TasksTable";
import React from 'react';
import { Route } from 'react-router';
const TaskRoutes = (props) => (
  <Route path="tasks"  component={Tasks}>
    <Route path="list" onEnter={() => {props.loadRepo.tasks(); props.loadRepo.tabs(tabs);}} component={TaskList}/>
    <Route path="table" onEnter={() => {props.loadRepo.tableData(); props.loadRepo.tabs(tabs);}} component={TasksTable}/>
  </Route>
)

export {Home, TaskRoutes};