import fetch from 'isomorphic-fetch';
import postParser from "../../Entities/Posts/PostParser.js";
import {changeFetchingStatus} from "./layoutActions";

export const REQUEST_POSTS = 'REQUEST_POSTS';

function requestPosts(text) {
  return {
    type: REQUEST_POSTS,
    text
  }
}


export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.map(postParser),
    receivedAt: Date.now()
  }
}


export function fetchPosts() {
  return function (dispatch) {
    dispatch(changeFetchingStatus(true));
    //dispatch(requestPosts("Receiving"));
    return fetch("http://127.0.0.1:8080/getList")
      .then(response => response.json())
      .then(json => {
        dispatch(changeFetchingStatus(false));
        dispatch(receivePosts(json));
        }
      )
  }
}