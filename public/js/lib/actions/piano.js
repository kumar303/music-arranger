import * as actionTypes from 'lib/constants/action-types';

import { setChordNotes } from './chords';


export function touchNote(note) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.TOUCH_NOTE,
      note: note,
    });
    dispatch(setChordNotes({
      root: note,
      chordType: state.pianoView.chordType,
    }));
  };
}
