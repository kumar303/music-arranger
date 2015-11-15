import * as actionTypes from 'lib/constants/action-types';


export const initialControlsState = {
  chordInversion: 0,
  chordType: 'M',
};


export default function controls(state, action) {
  switch (action.type) {
    case actionTypes.RESET_STATE:
      return initialControlsState;
    case actionTypes.RESTORE_STATE:
      return action.state.controls;
    case actionTypes.SET_CHORD_INVERSION:
      return Object.assign({}, state, {
        chordInversion: action.chordInversion,
      });
    case actionTypes.SET_CHORD_TYPE:
      return Object.assign({}, state, {
        chordType: action.chordType,
      });
    default:
      return state || initialControlsState;
  }
}
