import {
  SET_CALENDAR,
  SET_DAY
} from "../../actions/Admin/calendarActions";


export function setCalendar(state = {}, action) {
  switch (action.type) {
    case SET_CALENDAR:
      return action.calendar;
    case SET_DAY:
      state[action.day] = action.status;
      return JSON.parse(JSON.stringify(state));
    default:
      return state;
  }
}

