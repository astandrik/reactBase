import {
    generateActionFunc,
    fetchAsync,
    fetchPost
} from "./actionHelper.js";
import {loadTasks,loadWorkCodes, loadFinances, setGlobalTaskType} from "./tasksActions";
import { browserHistory } from 'react-router';

export const SET_USER = "SET_USER";
export const SET_SUBORDINATES = "SET_SUBORDINATES";
export const SET_PINGED_USER = "SET_PINGED_USER";

export const setLoggedUser = generateActionFunc(SET_USER);
export const setPingedUser = generateActionFunc(SET_PINGED_USER);
export const setSubordinates = generateActionFunc(SET_SUBORDINATES);

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function logout () {
  const handler =  function (json, dispatch, getState) {
      dispatch(pingLogin());
  }
  return fetchAsync(`/data/logout`, handler);
}

export function pingLogin(renderFunc) {
  const handler =  function (json, dispatch, getState) {
    dispatch(setPingedUser({
        id: json.data.id
    }));
    if(isFunction(renderFunc)) {
        renderFunc();
    };
    if(!json.data.id) {
      browserHistory.push('/login');
    } else {
      dispatch(getCurrentUser({}));
      dispatch(loadWorkCodes());
      dispatch(loadFinances());
      dispatch(getSubordinates({}));
      let location = browserHistory.getCurrentLocation();
      if(location.pathname == "/login" || location.pathname == "/") {
        location = "/tasks/my/table";
      }
      browserHistory.push(location);
    }
  }
  return fetchAsync(`/data/ping`, handler);
}

export function validateLoginData(obj) {
  const handler = (json,dispatch) => {
    dispatch(pingLogin());
  }
  const errorHandler = (dispatch) => {

  }
  return fetchPost(`/data/auth`, obj, handler, errorHandler);
}

export function getSubordinates() {
    const handler2 = (data, json, dispatch) => {
      const user = {
          label: json.data.user.name,
          value: json.data.user.id
      };
      let subs = data.concat([user]);
      let dict = {};
      subs.forEach(x => {
        dict[x.value] = x;
      });
      subs.dict = dict;
      dispatch(setSubordinates({
          subordinates: subs
      }));
    }
    const handler = (json, dispatch) => {
        const data = json.data.subordinates.map(x => ({
            label: x.name,
            value: x.id
        }));
        dispatch(fetchAsync(`/data/me`, handler2.bind(this,data)));
    };
    return fetchAsync('/data/subordinates', handler);
}

export function getCurrentUser() {
    const handler = function (json, dispatch) {
        const data = json.data.user;
        const user = {
            name: data.name,
            position: data.position,
            id: data.id
        };
        dispatch(setLoggedUser({
            user
        }));
    }
    return fetchAsync(`/data/me`, handler);
}
