import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose  } from 'redux'
import thunk  from 'redux-thunk'
import Reducers from './redux/reducers';
import SpinnerContainer from "./containers/SpinnerContainer";
import {fetchPosts} from "./redux/actions/postsActions";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ToolBar from "./components/ToolBar";
let store = createStore(Reducers,composeEnhancers(applyMiddleware(thunk)));
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import Home from './Routes/Home';
import './index.css';
import { Router, Route, browserHistory } from 'react-router';

var containerStyles = {
  display: "flex",
  width: "100%",
  height: "~(100% - 56px)",
  flexDirection: "row",
  justifyContent: "center"
}

var loadRepo = {
  posts: () => store.dispatch(fetchPosts())
}


const Root = () => (
    <Provider store={store}>
      <MuiThemeProvider>
        <div>
          <ToolBar/>
          <div style={containerStyles}>
            <SpinnerContainer/>
            <Router history={browserHistory}>
              <Route path="/postList" component={Home} onEnter={loadRepo.posts}/>
            </Router>
          </div>
        </div>
      </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
