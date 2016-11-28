import {CHANGE_COUNTER} from "./actions/counterActions";
import {REQUEST_POSTS, RECEIVE_POSTS} from "./actions/postsActions";
import {CHANGE_FETCHING_STATUS} from  "./actions/layoutActions";
import { combineReducers } from 'redux';


function counterChange(state = 0, action) {
  switch(action.type){
    case CHANGE_COUNTER:
      const inc = action.text == "inc" ? 1 : -1;
      return state + inc;
    break;
    default:
      return 0;
  }
}

function postsChange(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts
      break;
    default:
      return []
  }
}

function fetchStatusChange(state = false, action) {
  switch (action.type) {
    case CHANGE_FETCHING_STATUS:
      return action.text
      break;
    default:
      return false;
  }
}


export default combineReducers({
  counter: counterChange,
  posts: postsChange,
  isFetching: fetchStatusChange
})