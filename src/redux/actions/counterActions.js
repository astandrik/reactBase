export const CHANGE_COUNTER = "CHANGE_COUNTER";

export function changeCounter(text) {
  const action = {
    type: CHANGE_COUNTER,
    text
  }
  return action;
}
