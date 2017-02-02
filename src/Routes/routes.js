import Home from "./Home";
import {Tasks,TaskList} from "./Tasks";
import {Reports} from "./Reports";
import {Subordinates} from "./Subordinates";
import {TasksTable} from "./TasksTable";
import {Statistics} from "./Statistics"
import {StateStructureList,UsersList,CodesList, FinancesList} from "./Admin";
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
  const mainTasksEnter = (ev) => {
    props.loadRepo.clearLayout();
    props.loadRepo.workCodes();
    props.loadRepo.finances();
    props.loadRepo.subordinates();
    const type = ev.params.type;
    props.loadRepo.setGlobalTaskType(type);
  }
  return (
  <Route path="tasks/:type" loadRepo={props.loadRepo} component={Tasks} onEnter={mainTasksEnter}>
    <Route path="list" onEnter={taskEnter} component={TaskList}/>
    <Route path="table" onEnter={tableEnter} component={TasksTable}/>
  </Route>
  )
}

const StructureRoutes = (props) => {
  const structureEnter = () => {
    props.loadRepo.flatDepartments();
    props.loadRepo.departments();
    props.loadRepo.tabs([]);
    props.loadRepo.setCurrentTitle("Штатная структура");
    props.loadRepo.clearLayout();
  }
  return (
    <Route path="admin/structure" components={StateStructureList} onEnter={structureEnter} />
  )
}

const UsersRoutes = (props) => {
  const usersEnter = () => {
    props.loadRepo.users();
    props.loadRepo.tabs([]);
    props.loadRepo.setCurrentTitle("Список сотрудников");
    props.loadRepo.clearLayout();
    props.loadRepo.flatDepartments();
  }
  return (
    <Route path="admin/users" components={UsersList} onEnter={usersEnter} />
  )
}

const CodesRoutes = (props) => {
  const codesEnter = () => {
    props.loadRepo.codesTable();
    props.loadRepo.tabs([]);
    props.loadRepo.setCurrentTitle("Коды работ");
    props.loadRepo.clearLayout();
  }
  return (
    <Route path="admin/workCodes" components={CodesList} onEnter={codesEnter} />
  )
}


const FinancesRoutes = (props) => {
  const financesEnter = () => {
    props.loadRepo.financesTable();
    props.loadRepo.tabs([]);
    props.loadRepo.setCurrentTitle("Статьи финансирования");
    props.loadRepo.clearLayout();
  }
  return (
    <Route path="admin/finances" components={FinancesList} onEnter={financesEnter} />
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
    props.loadRepo.workCodes();
    props.loadRepo.finances();
    props.loadRepo.subordinates();
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

export {Home, TaskRoutes,ReportRoutes,SubordinatesRoutes,StatisticsRoutes, LoginRoutes,LogoutRoutes,StructureRoutes,
UsersRoutes, CodesRoutes, FinancesRoutes};