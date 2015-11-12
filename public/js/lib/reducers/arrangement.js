import * as actionTypes from 'lib/constants/action-types';


export const initialArrangementState = {
  exportedData: null,
  currentPart: 0,
  currentPosition: 0,
  // Example:
  // [[{"chordRoot":-8}, ...], [...]]
  parts: [],
};


export default function arrangement(state, action) {
  switch (action.type) {
    case actionTypes.RESET_STATE:
      return initialArrangementState;
    case actionTypes.SET_EXPORTED_DATA:
      return Object.assign({}, state, {
        exportedData: action.exportedData,
      });
    case actionTypes.CLEAR_EXPORTED_DATA:
      return Object.assign({}, state, {
        exportedData: initialArrangementState.exportedData,
      });
    case actionTypes.TOUCH_NOTE:
      return Object.assign({}, state, {
        parts: mergeNewPart(state, {
          chordRoot: action.note,
        }),
      });
    case actionTypes.SET_CHORD_TYPE:
      return Object.assign({}, state, {
        parts: mergeNewPart(state, {
          chordType: action.chordType,
        }),
      });
    case actionTypes.SET_CHORD_NOTES:
      return Object.assign({}, state, {
        parts: mergeNewPart(state, {
          chordNotes: action.chordNotes,
        }),
      });
    case actionTypes.SET_CHORD_INVERSION:
      return Object.assign({}, state, {
        parts: mergeNewPart(state, {
          chordInversion: action.chordInversion,
        }),
      });
    case actionTypes.SET_CURRENT_PART:
      return Object.assign({}, state, {
        currentPosition: 0,
        currentPart: action.part,
      });
    case actionTypes.SET_CURRENT_POSITION:
      return Object.assign({}, state, {
        currentPosition: action.position,
      });
    default:
      return state || initialArrangementState;
  }
}


function mergeNewPart(state, newData) {
  //
  // Returns a new part merged into the current position of state.parts.
  //
  let part = (state.parts[state.currentPart] || []).slice();
  let position = part[state.currentPosition] || {};
  let mergedData = Object.assign({}, position, newData);
  part[state.currentPosition] = mergedData;

  let allParts = state.parts.slice();
  allParts[state.currentPart] = part;
  return allParts;
}
