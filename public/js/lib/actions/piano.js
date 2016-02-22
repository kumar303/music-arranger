import * as actionTypes from 'lib/constants/action-types';

import stateStorage from 'lib/util/state-storage';


export function touchNote(note) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.TOUCH_NOTE,
      note: note,
    });
    stateStorage.saveState({
      dispatch: dispatch,
      state: getState(),
    });
  };
}
