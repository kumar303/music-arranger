import * as actionTypes from 'lib/constants/action-types';


export const initialPianoViewState = {
  chordRoot: -12,
  chordType: 'M',
  chordNotes: [],
};


export default function pianoView(state, action) {
  switch (action.type) {
    case actionTypes.SET_CHORD_TYPE:
      return Object.assign({}, state, {
        chordType: action.chordType,
      });
    case actionTypes.TOUCH_NOTE:
      return Object.assign({}, state, {
        chordRoot: action.note,
      });
    case actionTypes.SET_CHORD_NOTES:
      return Object.assign({}, state, {
        chordNotes: action.chordNotes,
      });
    default:
      return state || initialPianoViewState;
  }
}
