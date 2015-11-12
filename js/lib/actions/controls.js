import * as actionTypes from 'lib/constants/action-types';

import { setChordNotes } from './chords';


export function setChordType(chordType) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.SET_CHORD_TYPE,
      chordType: chordType,
    });
    dispatch(setChordNotes({
      root: state.pianoView.chordRoot,
      chordType: chordType,
    }));
  };
}


export function invertChord(increment) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.SET_CHORD_INVERSION,
      chordInversion: state.controls.chordInversion + increment,
    });
  };
}


export function resetChordInversion() {
  return {
    type: actionTypes.SET_CHORD_INVERSION,
    chordInversion: 0,
  };
}
