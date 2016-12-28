export function generateActionFunc(type) {
  const func = function(obj) {
    const action = {
      type: type,
      ...obj
    }
    return action;
  }
  return func;
}
const CHANGE_FETCHING_STATUS = "CHANGE_FETCHING_STATUS";
export const changeFetchingStatus = generateActionFunc(CHANGE_FETCHING_STATUS);

export function fetchAsync(url, handler) {
  return function(dispatch) {
    dispatch(changeFetchingStatus({status: true}));
    return fetch(url)
      .then(response => response.json())
      .then(json => {
          dispatch(changeFetchingStatus({status: false}));
          handler(json, dispatch);
        }
      )
  }
}