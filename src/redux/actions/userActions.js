import {
    generateActionFunc,
    fetchAsync
} from "./actionHelper.js";

export const SET_USER = "SET_USER";
export const SET_SUBORDINATES = "SET_SUBORDINATES";

export const setLoggedUser = generateActionFunc(SET_USER);
export const setSubordinates = generateActionFunc(SET_SUBORDINATES);

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
