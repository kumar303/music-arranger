import * as actionTypes from 'lib/constants/action-types';
import stateStorage from 'lib/util/state-storage';


export function appError(error) {
  return {
    type: actionTypes.APP_ERROR,
    error: error,
  };
}


export function resetState() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.RESET_STATE,
    });
    stateStorage.saveState({
      dispatch: dispatch,
      state: getState(),
    });
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
