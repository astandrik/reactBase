import Home from "./Home";
import {Tasks,TaskList, tabs} from "./Tasks";
import React from 'react';
import { Route } from 'react-router';

const TaskRoutes = (props) => (
  <Route path="tasks" onEnter={() => {props.loadRepo.tasks(); props.loadRepo.tabs(tabs);}} component={Tasks}>
    <Route path="list" component={TaskList}/>
  </Route>
)

export {Home, TaskRoutes};