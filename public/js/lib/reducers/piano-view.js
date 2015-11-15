import * as actionTypes from 'lib/constants/action-types';


export const initialPianoViewState = {
  chordRoot: -12,
  chordType: 'M',
  chordNotes: [],
};


export default function pianoView(state, action) {
  switch (action.type) {
    case actionTypes.RESET_STATE:
      return initialPianoViewState;
    case actionTypes.RESTORE_STATE:
      return action.state.pianoView;
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