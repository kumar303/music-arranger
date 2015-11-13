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
};
