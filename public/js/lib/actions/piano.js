import * as actionTypes from 'lib/constants/action-types';

import stateStorage from 'lib/util/state-storage';
import { setChordNotes } from './arrangement';


export function touchNote(note) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.TOUCH_NOTE,
      note: note,
    });
    dispatch(setChordNotes({
      root: note,
      chordType: state.controls.chordType,
    }));
    dispatch({
      type: actionTypes.SET_CHORD_TYPE,
      chordType: state.controls.chordType,
    });
    stateStorage.saveState({
      dispatch: dispatch,
      state: getState(),
    });
  };
}
