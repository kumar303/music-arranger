export const PIANO_KEY_START = -12;  // low C
export const PIANO_KEY_END = 23;  // high B

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

// TODO: build chords out of scales instead so we can
// define the notes as first, third, fifth, ...

// Each number in `map` are the steps you add to a root to form the chord.
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
  {key: 'm9', name: 'Minor 9th', map: [3, 7, 10, 14]},
];

// Map of chord key to root offsets to make note calculations easier.
export var CHORD_MAP = {};

CHORD_MAP_NAMES.forEach((chord) => {
  CHORD_MAP[chord.key] = chord.map;
});
