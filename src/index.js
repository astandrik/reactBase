import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose  } from 'redux'
import thunk  from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import { Router, Route, browserHistory, IndexRedirect  } from 'react-router';

import Reducers from './redux/reducers';
let store = createStore(Reducers,composeEnhancers(applyMiddleware(thunk)));
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import {TaskRoutes,ReportRoutes,SubordinatesRoutes,StatisticsRoutes} from "./Routes/routes";

import {getCurrentUser,getSubordinates} from "./redux/actions/userActions";
import {setTabs, setCurrentTitle, clearLayout} from "./redux/actions/layoutActions";
import {loadTasks,loadWorkCodes, loadFinances, setGlobalTaskType} from "./redux/actions/tasksActions";
import {loadTableData} from "./redux/actions/tableActions";
import LayoutContainer from "./LayoutContainer";

var loadRepo = {
  user: (user) => store.dispatch(getCurrentUser({})),
  tasks: ()=>store.dispatch(loadTasks()),
  tabs: (tabs)=>store.dispatch(setTabs({tabs})),
  tableData: ()=>store.dispatch(loadTableData({day: store.getState().currentWeek})),
  setCurrentTitle: (title) => store.dispatch(setCurrentTitle({title:title})),
  workCodes: () => store.dispatch(loadWorkCodes()),
  finances: () => store.dispatch(loadFinances()),
  subordinates: () => store.dispatch(getSubordinates({})),
  setGlobalTaskType: (type) => store.dispatch(setGlobalTaskType({routeType: type})),
  clearLayout: () => store.dispatch(clearLayout())
}
loadRepo.user();
loadRepo.workCodes();
loadRepo.finances();
loadRepo.subordinates();


const TasksRouter = TaskRoutes({loadRepo:loadRepo});
const ReportRouter = ReportRoutes({loadRepo:loadRepo});
const SubordinatesRouter = SubordinatesRoutes({loadRepo:loadRepo});
const StatisticsRouter = StatisticsRoutes({loadRepo:loadRepo});

const Root = () => (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={LayoutContainer}>
            <IndexRedirect to="/tasks/my/table"/>
            {TasksRouter}
            {ReportRouter}
            {SubordinatesRouter}
            {StatisticsRouter}
          </Route>
      </Router>
      </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

