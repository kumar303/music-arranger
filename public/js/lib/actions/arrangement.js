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
    // When selecting song parts that don't exist yet,
    // this fills in a default C chord just to indicate
    // that action created a new part.
    chordRoot = -12;  // C
    let chordNotesAction = setChordNotes({
      root: chordRoot,
      chordType: state.pianoView.chordType,
    });
    chordNotes = chordNotesAction.chordNotes;
  }

  let chordType = (position.chordType !== undefined ?
                   position.chordType : state.controls.chordType);
  let chordInversion = (position.chordInversion !== undefined ?
                        position.chordInversion :
                        state.controls.chordInversion);

  dispatch({
    type: actionTypes.TOUCH_NOTE,
    note: chordRoot,
  });
  dispatch({
    type: actionTypes.SET_CHORD_NOTES,
    chordNotes: chordNotes,
  });
  dispatch({
    type: actionTypes.SET_CHORD_TYPE,
    chordType: chordType,
  });
  dispatch({
    type: actionTypes.SET_CHORD_INVERSION,
    chordInversion: chordInversion,
  });
}


export function clearExportedData() {
  return {
    type: actionTypes.CLEAR_EXPORTED_DATA,
  };
}


export function setExportedData() {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.SET_EXPORTED_DATA,
      exportedData: Object.assign({}, {
        parts: state.arrangement.parts,
      }),
    });
  };
}
