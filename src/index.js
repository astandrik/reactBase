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
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Reducers from './redux/reducers';
let store = createStore(Reducers,composeEnhancers(applyMiddleware(thunk)));
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import {Home,TaskRoutes} from "./Routes/routes";

import {getCurrentUser,getSubordinates} from "./redux/actions/userActions";
import {setTabs, setCurrentTitle} from "./redux/actions/layoutActions";
import {loadTasks,loadWorkCodes, loadFinances} from "./redux/actions/tasksActions";
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
  subordinates: () => store.dispatch(getSubordinates({}))
}
loadRepo.user();
loadRepo.workCodes();
loadRepo.finances();
loadRepo.subordinates();


const TasksRouter = TaskRoutes({loadRepo:loadRepo});

const Root = () => (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={LayoutContainer}>
            <IndexRoute component={Home}/>
            {TasksRouter}
          </Route>
      </Router>
      </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
