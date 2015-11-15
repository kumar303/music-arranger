import * as actionTypes from 'lib/constants/action-types';

import {
  CHORD_MAP,
  PIANO_KEY_START,
  PIANO_KEY_END,
} from 'lib/constants/piano';
import stateStorage from 'lib/util/state-storage';


export function setCurrentPart(partNum) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_CURRENT_PART,
      part: partNum,
    });
    dispatchCurrentChords(dispatch, getState());
  };
}


export function setPosition(partNum, position) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_CURRENT_PART,
      part: partNum,
    });
    dispatch({
      type: actionTypes.SET_CURRENT_POSITION,
      position: position,
    });
    dispatchCurrentChords(dispatch, getState());

    stateStorage.saveState({
      dispatch: dispatch,
      state: getState(),
    });
  };
}


function dispatchCurrentChords(dispatch, state) {
  const arrangement = state.arrangement;
  const part = arrangement.parts[arrangement.currentPart] || [];
  const posIndex = arrangement.currentPosition;
  const position = part[posIndex] || {};

  let chordRoot = position.chordRoot;
  let chordNotes = position.chordNotes;

  if (typeof chordRoot === 'undefined') {
    if (posIndex > 0 && part[posIndex - 1] === undefined) {
      // This means they clicked a square out of order.
      // Among other weirdness, this would break rison decoding.
      console.log('cannot add a chord out of order in the arrangement');
      return;
    }
    // When selecting song parts that don't exist yet,
    // this fills in a default chord just to indicate
    // that the action created a new part.
    chordRoot = _defaultChordRoot(part[arrangement.currentPosition - 1]);
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


export function setChordNotes({root, chordType='M'}) {
  let chordNotes = [];
  chordNotes.push(root);
  CHORD_MAP[chordType].forEach((sumBy) => {
    chordNotes.push(root + sumBy);
  });
  return {
    type: actionTypes.SET_CHORD_NOTES,
    chordNotes: chordNotes,
  };
}


function _defaultChordRoot(previousPosition) {
  let root = null;
  if (previousPosition) {
    root = previousPosition.chordRoot + 2;
  }
  if (root === null || root > PIANO_KEY_END) {
    root = PIANO_KEY_START;
  }
  return root;
}