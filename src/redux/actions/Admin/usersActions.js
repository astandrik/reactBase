import {
    generateActionFunc,
    fetchAsync,
    fetchPost
} from "../actionHelper.js";
import {
    reset
} from 'redux-form';
import {UsersTree} from  "../../../Entities/Admin/Users";
import User from  "../../../Entities/Admin/User";
export const SET_USERS = "SET_USERS";
export const SET_USERS_PAGE = "SET_USERS_PAGE";
export const SET_USER_VIEW = "SET_USER_VIEW";

export const setUsers = generateActionFunc(SET_USERS);
export const setUser = generateActionFunc(SET_USER_VIEW);
export const setUsersPage = generateActionFunc(SET_USERS_PAGE);

const limit = 40;

export function getUsers(page) {
  const currentOffset = page*limit;
  const handler = (json, dispatch, getState) => {
    const users = new UsersTree(json.data.users);
    dispatch(setUsers(users));
  }
  return fetchAsync(`/all/users?limit=${limit}&offset=${currentOffset}`,handler);
}

export function loadUser(user) {
  const handler = (json, dispatch, getState) => {
    const user = new User(json.data);
    dispatch(setUser({user}));
  }
  return fetchAsync(`/get/user?id=` + user.id, handler);
}

export function editUser(data) {
  const handler = (json,dispatch, getState) => {
      const page = getState().usersPage;
      dispatch(getUsers(page));
  }
  const errorHandler = (dispatch) => {
    dispatch(loadUser(data));
    dispatch(reset("userInfoDialogForm"));
  }
  return fetchPost(`/edit/user`, data, handler, errorHandler);
}

export function createUser(data) {
    const handler = (json,dispatch, getState) => {
      const page = getState().usersPage;
      dispatch(getUsers(page));
      dispatch(loadUser(json.data));
    }
    return fetchPost(`/create/user`, data, handler);
}