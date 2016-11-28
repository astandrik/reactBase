export const CHANGE_FETCHING_STATUS = "CHANGE_FETCHING_STATUS";

export function changeFetchingStatus(text) {
  const action = {
    type: CHANGE_FETCHING_STATUS,
    text
  }
  return action;
}
