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
