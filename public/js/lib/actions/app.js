import * as actionTypes from 'lib/constants/action-types';


export function appError(error) {
  return {
    type: actionTypes.APP_ERROR,
    error: error,
  };
}


export function showStatus({apiFetch=fetch} = {}) {
  return (dispatch) => apiFetch('http://olympia.dev:8000/',
                                {headers: {accept: 'application/json'}})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch({
        type: actionTypes.SET_STATUS,
        status: data.status,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.APP_ERROR,
        error: 'Could not fetch status: ' + error,
      });
    });
}
