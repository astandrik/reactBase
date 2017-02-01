import {
    generateActionFunc,
    fetchAsync,
    fetchPost
} from "../actionHelper.js";
import {
    reset
} from 'redux-form';
import {loadWorkCodes} from "../tasksActions";

export function editCode(data) {
  const handler = (json,dispatch, getState) => {
      dispatch(loadWorkCodes());
  }
  data.value = data.label;
  return fetchPost(`/edit/workcode`, data, handler);
}

export function createCode(data) {
  const handler = (json,dispatch, getState) => {
      dispatch(loadWorkCodes());
  }
  data.value = data.label;
  return fetchPost(`/create/workcode`, data, handler);
}