import {
    showValidationErrors,
} from "./errorActions";
import {
  openErrorsModal
} from "./layoutActions";

export function generateActionFunc(type) {
    const func = function (obj) {
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


export function fetchPost(url, data, handler) {
    var formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return function (dispatch) {
        dispatch(changeFetchingStatus({
            status: true
        }));
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(response => response.json(), error => {
                debugger;
            })
            .then(json => {
                dispatch(changeFetchingStatus({
                    status: false
                }));
                if (json.data === false) {
                    dispatch(showValidationErrors({
                        errors: json.error
                    }));
                    dispatch(openErrorsModal({}));
                } else {
                  handler(json, dispatch);
                }
            })
    }
}

export function fetchAsync(url, handler) {
    return function (dispatch) {
        dispatch(changeFetchingStatus({
            status: true
        }));
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                dispatch(changeFetchingStatus({
                    status: false
                }));
                handler(json, dispatch);
            })
    }
}
