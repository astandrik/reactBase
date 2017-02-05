import {
  SET_PIE,
  SET_BAR,
  SET_PERIOD,
  SET_WEEK_PERIOD,
  SET_DAY_PERIOD,
  SET_MONTH_PERIOD
} from "../actions/statisticsActions";

export function setPie(state = [], action) {
  switch (action.type) {
    case SET_PIE:
      return action.pie;
      break;
    case SET_BAR:
      return [];
      break;
    default:
      return state;
  }
}

export function setBar(state = [], action) {
  switch (action.type) {
    case SET_BAR:
      return action.bar;
      break;
    case SET_PIE:
      return []
      break;
    default:
      return state;
  }
}


export function setDayPeriod(state = {first: new Date(), last: new Date()}, action) {
  switch (action.type) {
    case SET_DAY_PERIOD:
      if(action.first) {
          return {first: action.first, last: state.last};
      } else if(action.last) {
        return {first: state.first, last: action.last};
      } else {
        return state;
      }
    default:
      return state;

  }
}


export function setMonthPeriod(state = {first: new Date(), last: new Date()}, action) {
  switch (action.type) {
    case SET_MONTH_PERIOD:
      if(action.first) {
          return {first: action.first, last: state.last};
      } else if(action.last) {
        return {first: state.first, last: action.last};
      } else {
        return state;
      }
    default:
      return state;

  }
}

export function setWeekPeriod(state = {first: new Date(), last: new Date()}, action) {
  switch (action.type) {
    case SET_WEEK_PERIOD:
      if(action.first) {
          return {first: action.first, last: state.last};
      } else if(action.last) {
        return {first: state.first, last: action.last};
      } else {
        return state;
      }
    default:
      return state;

  }
}

export function setPeriod(state = 2, action) {
  switch (action.type) {
    case SET_PERIOD:
      return action.period;
    default:
      return state;
  }
}