import * as actionTypes from 'lib/constants/action-types';
import { CHORD_MAP } from 'lib/constants/piano';


export function setChordNotes({root, chordType='M'}) {
  let chordNotes = [];
  chordNotes.push(root);
  CHORD_MAP[chordType].forEach((sumBy) => {
    chordNotes.push(root + sumBy);
  });
  return {
    type: actionTypes.SET_CHORD_NOTES,
    chordNotes: chordNotes,
  };
}
