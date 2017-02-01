import {
    generateActionFunc,
    fetchAsync,
    fetchPost
} from "../actionHelper.js";
import {
    reset
} from 'redux-form';
import {loadFinances} from "../tasksActions";

export function editFinance(data) {
  const handler = (json,dispatch, getState) => {
      dispatch(loadFinances());
  }
  data.value = data.label;
  return fetchPost(`/edit/finance`, data, handler);
}

export function createFinance(data) {
  const handler = (json,dispatch, getState) => {
      dispatch(loadFinances());
  }
  data.value = data.label;
  return fetchPost(`/create/finance`, data, handler);
}