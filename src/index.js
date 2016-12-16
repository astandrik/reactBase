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


import {ToolbarContainer, SpinnerContainer,LeftNavContainer,GlobalHeaderContainer}  from "./containers/Containers";
import Container from "./components/Container";
import Reducers from './redux/reducers';
let store = createStore(Reducers,composeEnhancers(applyMiddleware(thunk)));
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import {Home,TaskRoutes} from "./Routes/routes";

var containerStyles = {
  display: "flex",
  width: "100%",
  height: "calc(100% - 56px)",
  justifyContent: "center"
}

import {getCurrentUser, setTabs} from "./redux/actions/layoutActions";
import {loadTasks} from "./redux/actions/tasksActions";

var loadRepo = {
  user: (user) => store.dispatch(getCurrentUser({id: 1})),
  tasks: ()=>store.dispatch(loadTasks()),
  tabs: (tabs)=>store.dispatch(setTabs({tabs}))
}
loadRepo.user();

const RouterCreator = function(name, to, hashtag) {
  return {name, to, hashtag};
}

const sidenavRoutes = [
  {name: "Мои задачи", to:"/tasks/list", children:[
    RouterCreator("Нераспределенные задачи", null, "free"),
    RouterCreator("Мои задачи", null, "my"),
    RouterCreator("Задачи подчиненных", null, "subordinate"),
  ]},
  RouterCreator("Мои отчеты", '/reports'),
  RouterCreator("Мои трудозатраты", '/work')
];



class Layout extends React.Component {
  render() {
    return (
    <div>
      <ToolbarContainer/>
        <div style={containerStyles}>
          <SpinnerContainer/>
          <LeftNavContainer children={sidenavRoutes}/>
          <Container vertical="true" style={{background:"#DDDDDD"}}>
            <GlobalHeaderContainer tabs={this.props.tabs} flex="1" containerStyle={{background: "white",maxHeight: "80px", minHeight:"80px",borderBottom:"1px solid black"}} />
              <div containerStyle={{overflow:"auto"}} style={{height: "calc(100% - 20px)"}}>
                {this.props.children}
              </div>
          </Container>
      </div>
    </div>
    )
  }
}

const TasksRouter = TaskRoutes({loadRepo:loadRepo});

const Root = () => (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={Layout}>
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
