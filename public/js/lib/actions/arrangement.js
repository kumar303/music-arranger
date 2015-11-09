import * as actionTypes from 'lib/constants/action-types';

import { setChordNotes } from './chords';


export function setCurrentPart(partNum) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_CURRENT_PART,
      part: partNum,
    });
    dispatchCurrentChords(dispatch, getState());
  };
}


export function setCurrentPosition(position) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_CURRENT_POSITION,
      position: position,
    });
    dispatchCurrentChords(dispatch, getState());
  };
}


function dispatchCurrentChords(dispatch, state) {
  const arrangement = state.arrangement;
  const part = arrangement.parts[arrangement.currentPart] || [];
  const position = part[arrangement.currentPosition] || {};

  let chordRoot = position.chordRoot;
  let chordNotes = position.chordNotes;

  if (typeof chordRoot === 'undefined') {
    chordRoot = -12;  // C
    let chordNotesAction = setChordNotes({
      root: chordRoot,
      chordType: state.pianoView.chordType,
    });
    chordNotes = chordNotesAction.chordNotes;
  }

  dispatch({
    type: actionTypes.TOUCH_NOTE,
    note: chordRoot,
  });
  dispatch({
    type: actionTypes.SET_CHORD_NOTES,
    chordNotes: chordNotes,
  });
}
