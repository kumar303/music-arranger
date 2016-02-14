import * as actionTypes from 'lib/constants/action-types';

import stateStorage from 'lib/util/state-storage';
import { getCurrentChordPart, setChordNotes } from './arrangement';


export function setChordType(chordType) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.SET_CHORD_TYPE,
      chordType: chordType,
    });
    dispatch(setChordNotes({
      root: getCurrentChordPart(state.arrangement).chordRoot,
      chordType: chordType,
    }));
    stateStorage.saveState({
      dispatch: dispatch,
      state: getState(),
    });
  };
}


export function invertChord(increment) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.SET_CHORD_INVERSION,
      chordInversion: state.controls.chordInversion + increment,
    });
    stateStorage.saveState({
      dispatch: dispatch,
      state: getState(),
    });
  };
}


export function resetChordInversion() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_CHORD_INVERSION,
      chordInversion: 0,
    });
    stateStorage.saveState({
      dispatch: dispatch,
      state: getState(),
    });
  };
}
