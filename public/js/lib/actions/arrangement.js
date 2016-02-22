import * as actionTypes from 'lib/constants/action-types';

import { PIANO_KEY_START, PIANO_KEY_END } from 'lib/constants/piano';
import { CHORD_FORMULAS } from 'lib/constants/chords';
import { MASTER_SCALE_MAP, SCALES } from 'lib/constants/scales';
import stateStorage from 'lib/util/state-storage';
import { noteName } from 'lib/util/notes';


export function setCurrentPart(partNum) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_CURRENT_PART,
      part: partNum,
    });
    dispatchCurrentChords(dispatch, getState());
  };
}


export function getCurrentChordPart({currentPart, currentPosition, parts}) {
  let arrPart = (parts.length) ? parts[currentPart]: [];
  return (arrPart.length) ? arrPart[currentPosition] : {};
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


export function applyChordFormula({root, chordType}) {
  // Given a root (anywhere on the keyboard), apply a chord formula
  // to return a list of all chord notes.
  let formula = CHORD_FORMULAS[chordType];
  if (formula === undefined) {
    throw new Error(`unknown chordType: ${chordType} (or undefined formula)`);
  }

  let rootName = noteName(root);
  let rootOffset = MASTER_SCALE_MAP[rootName];
  // Get all the notes in this root's scale.
  let scaleNotes = SCALES[rootName].notes;

  return formula.map((pos) => {
    let modifier;
    if (pos.modifier) {
      // Prepare to apply a modifier, such as flat() or sharp()
      // which would adjust the note number.
      modifier = pos.modifier;
      pos = pos.position;
    }
    let noteInPosition = scaleNotes[pos - 1];
    if (noteInPosition === undefined) {
      throw new Error(
        `Position ${pos} missing from scale ${rootName}, ${chordType}`);
    }
    // Apply the scale position for this part of the chord.
    // Also adjust the positions based on where the tonic of the scale
    // starts. For example, D needs to move back -1 numbers.
    let note = root + noteInPosition - rootOffset;
    if (modifier) {
      note = modifier(note);
    }
    return note;
  });
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
