import * as actionTypes from 'lib/constants/action-types';


export function touchNote(note) {
  return {
    type: actionTypes.TOUCH_NOTE,
    note: note,
  };
}
