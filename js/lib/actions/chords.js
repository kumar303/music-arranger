import * as actionTypes from 'lib/constants/action-types';

const CHORD_MAP = {
  '': [],  // no chord
  'M': [4, 7],
  'm': [3, 7],
  'aug': [4, 8],
  'dim': [3, 6],
  'sus4': [5, 7],
  'sus2': [2, 7],
  '5': [7],
  '6': [4, 7, 9],
  'm6': [3, 7, 9],
  '7': [4, 7, 10],
  'M7': [4, 7, 11],
  'm7': [3, 7, 10],
};


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
