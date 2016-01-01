export const PIANO_KEY_START = -12;  // low C
export const PIANO_KEY_END = 13;  // high C#

export const NOTE_NAMES = {
  0: 'C',
  1: 'C#',
  2: 'D',
  3: 'Eb',
  4: 'E',
  5: 'F',
  6: 'F#',
  7: 'G',
  8: 'Ab',
  9: 'A',
  10: 'Bb',
  11: 'B',
  12: 'C',
};

// These are the steps you'd add to a root note to form each chord.
export const CHORD_MAP = {
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
  '9': [4, 7, 10, 14],
  '9b5': [4, 6, 10, 14],
  'm9': [3, 7, 10, 14],
};

// FIXME: combine this with CHORD_MAP and refactor everything that uses it.
export const CHORD_MAP_NAMES = [
  {key: '', name: 'None', map: []},
  {key: 'M', name: 'Major', map: [4, 7]},
  {key: 'm', name: 'Minor', map: [3, 7]},
  {key: 'aug', name: 'Augmented', map: [4, 8]},
  {key: 'dim', name: 'Diminished', map: [3, 6]},
  {key: 'sus4', name: 'Sustained 4th', map: [5, 7]},
  {key: 'sus2', name: 'Sustained 2nd', map: [2, 7]},
  {key: '5', name: 'Fifth', map: [7]},
  {key: '6', name: 'Sixth', map: [4, 7, 9]},
  {key: 'm6', name: 'Minor 6th', map: [3, 7, 9]},
  {key: '7', name: 'Seventh', map: [4, 7, 10]},
  {key: 'M7', name:'Major 7th', map: [4, 7, 11]},
  {key: 'm7', name: 'Minor 7th', map: [3, 7, 10]},
  {key: '9', name: 'Ninth', map: [4, 7, 10, 14]},
  // This is a 7 Flat 5 with a ninth added
  {key: '9b5', name: 'Nine Flat 5', map: [4, 6, 10, 14]},
  {key: 'm9', name: 'Minor 9th', map: ['TODO']},
];
