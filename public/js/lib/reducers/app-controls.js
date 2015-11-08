import * as actionTypes from 'lib/constants/action-types';


export const initialAppControlsState = {
  chordType: 'M',
};


export default function appControls(state, action) {
  switch (action.type) {
    case actionTypes.SET_CHORD_TYPE:
      return Object.assign({}, state, {
        chordType: action.chordType,
      });
    default:
      return state || initialAppControlsState;
  }
}
