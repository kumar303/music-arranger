import * as actionTypes from 'lib/constants/action-types';


export function touchNote(note) {
  return {
    type: actionTypes.TOUCH_NOTE,
    note: note,
    chord: makeMappedChord({root: note}),
  };
}


const chordMap = {
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


function makeMappedChord({root, chordName='M'}) {
  var chordNotes = [root];
  chordMap[chordName].forEach(function(sumBy) {
    chordNotes.push(root + sumBy);
  });
  return chordNotes;
}
