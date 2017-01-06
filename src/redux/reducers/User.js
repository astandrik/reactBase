import {
    SET_USER,
    SET_SUBORDINATES
} from "../actions/userActions";

export function setSubordinates(state = [], action) {
    switch (action.type) {
    case SET_SUBORDINATES:    
        return action.subordinates
    default:
        return state;
    }
}

export function userSet(state = {
    name: 'None',
    position: 'Никто'
}, action) {
    switch (action.type) {
    case SET_USER:
        return {
            name: action.user.name,
            position: action.user.position
        };
    default:
        return state;
    }
}