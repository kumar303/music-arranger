import * as actionTypes from 'lib/constants/action-types';


export function setChordType(chordType) {
  return {
    type: actionTypes.SET_CHORD_TYPE,
    chordType: chordType,
  };
}
