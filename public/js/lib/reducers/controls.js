import * as actionTypes from 'lib/constants/action-types';


export const initialControlsState = {
  chordType: 'M',
};


export default function controls(state, action) {
  switch (action.type) {
    case actionTypes.SET_CHORD_TYPE:
      return Object.assign({}, state, {
        chordType: action.chordType,
      });
    default:
      return state || initialControlsState;
  }
}
