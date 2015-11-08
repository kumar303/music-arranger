import * as actionTypes from 'lib/constants/action-types';


export const initialPianoViewState = {
  chordNotes: {},
};


export default function pianoView(state, action) {
  switch (action.type) {
    case actionTypes.TOUCH_NOTE:
      let chordNotes = {};
      action.chord.forEach((n) => (chordNotes[n] = true));
      return Object.assign({}, state, {
        chordNotes: chordNotes,
      });
    default:
      return state || initialPianoViewState;
  }
}
