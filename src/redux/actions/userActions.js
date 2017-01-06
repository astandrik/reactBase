import {
    generateActionFunc,
    fetchAsync
} from "./actionHelper.js";

export const SET_USER = "SET_USER";
export const SET_SUBORDINATES = "SET_SUBORDINATES";

export const setLoggedUser = generateActionFunc(SET_USER);
export const setSubordinates = generateActionFunc(SET_SUBORDINATES);

export function getSubordinates() {
    const handler = (json, dispatch) => {
        const data = json.data.subordinates.map(x => ({
            label: x.name,
            value: x.id
        }));
        dispatch(setSubordinates({
            subordinates: data
        }));
    };
    return fetchAsync('/data/subordinates', handler);
}

export function getCurrentUser() {
    const handler = function (json, dispatch) {
        const data = json.data.user;
        const user = {
            name: data.name,
            position: data.position
        };
        dispatch(setLoggedUser({
            user
        }));
    }
    return fetchAsync(`/data/me`, handler);
}
