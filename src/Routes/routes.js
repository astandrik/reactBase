import Home from "./Home";
import {Tasks,TaskList} from "./Tasks";
import {Reports} from "./Reports";
import {Subordinates} from "./Subordinates";
import {TasksTable} from "./TasksTable";
import {Statistics} from "./Statistics"
import {StateStructureList} from "./Structure";
import Login from "./Login";
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
  <Route path="tasks/:type" loadRepo={props.loadRepo} component={Tasks}>
    <Route path="list" onEnter={taskEnter} component={TaskList}/>
    <Route path="table" onEnter={tableEnter} component={TasksTable}/>
  </Route>
  )
}

const StructureRoutes = (props) => {
  const structureEnter = () => {
    props.loadRepo.departments();
    props.loadRepo.flatDepartments();
  }
  return (
    <Route path="structure" components={StateStructureList} onEnter={structureEnter} />
  )
}

const ReportRoutes = (props) => {
  const reportsEnter = () => {
    props.loadRepo.tabs([]);
    props.loadRepo.setCurrentTitle("Мои отчеты");
    props.loadRepo.clearLayout();
  }
  return (
    <Route path="reports" component={Reports}  onEnter={reportsEnter}/>
  )
}

const SubordinatesRoutes = (props) => {
  const subordinatesEnter = () => {
    props.loadRepo.tabs([]);
    props.loadRepo.setCurrentTitle("Мои сотрудники");
    props.loadRepo.clearLayout();
    props.loadRepo.tableData();
  }
  return (
    <Route path="subordinates" component={Subordinates}  onEnter={subordinatesEnter}/>
  )
}

const LoginRoutes = (props) => {
  return (
    <Route path="login" component={Login}/>
  )
}

const LogoutRoutes = (props) => {
  return (
    <Route path="logout" onEnter={props.loadRepo.logout}/>
  )
}

const StatisticsRoutes = (props) => {
  const statisticsEnter = () => {
    props.loadRepo.tabs([]);
    props.loadRepo.setCurrentTitle("Статистика");
    props.loadRepo.clearLayout();
  }
  return (
    <Route path="statistics" component={Statistics}  onEnter={statisticsEnter}/>
  )
}

export {Home, TaskRoutes,ReportRoutes,SubordinatesRoutes,StatisticsRoutes, LoginRoutes,LogoutRoutes,StructureRoutes};