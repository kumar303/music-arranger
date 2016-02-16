
// 12-step scale of all notes.
// The keys (0-11) are used as offsets for chord formulas.
export const MASTER_SCALE = [
  'C',
  'C#',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
];

// Map of IDs for each note in the scale.
// e.g. {C: 0, C#: 1, D: 2, ...}
export var MASTER_SCALE_MAP = {};

MASTER_SCALE.forEach((name, key) => {
  MASTER_SCALE_MAP[name] = key;
});

// Map of notes in each scale.
// TODO: Each octave of notes repeat, maybe fix this. The reason it
// repeats is to make applying formulas for 9th, 11th, and 13th chords
// easier.
export var SCALES = {
  'C': {
    scale: 'major',
    notes: getScaleNotes('C', 'D', 'E', 'F', 'G', 'A', 'B',
                         'C', 'D', 'E', 'F', 'G', 'A', 'B'),
  },
  'C#': {
    scale: 'major',
    notes: getScaleNotes('C#', 'Eb', 'F', 'F#', 'Ab', 'Bb', 'C',
                         'C#', 'Eb', 'F', 'F#', 'Ab', 'Bb', 'C'),
  },
  'D': {
    scale: 'major',
    notes: getScaleNotes('D', 'E', 'F#', 'G', 'A', 'B', 'C#',
                         'D', 'E', 'F#', 'G', 'A', 'B', 'C#'),
  },
  'Eb': {
    scale: 'major',
    notes: getScaleNotes('Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D',
                         'Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'),
  },
  'E': {
    scale: 'major',
    notes: getScaleNotes('E', 'F#', 'Ab', 'A', 'B', 'C#', 'Eb',
                         'E', 'F#', 'Ab', 'A', 'B', 'C#', 'Eb'),
  },
  'F': {
    scale: 'major',
    notes: getScaleNotes('F', 'G', 'A', 'Bb', 'C', 'D', 'E',
                         'F', 'G', 'A', 'Bb', 'C', 'D', 'E'),
  },
  'F#': {
    scale: 'major',
    notes: getScaleNotes('F#', 'Ab', 'Bb', 'B', 'C#', 'Eb', 'F',
                         'F#', 'Ab', 'Bb', 'B', 'C#', 'Eb', 'F'),
  },
  'G': {
    scale: 'major',
    notes: getScaleNotes('G', 'A', 'B', 'C', 'D', 'E', 'F#',
                         'G', 'A', 'B', 'C', 'D', 'E', 'F#'),
  },
  'Ab': {
    scale: 'major',
    notes: getScaleNotes('Ab', 'Bb', 'C', 'C#', 'Eb', 'F', 'G',
                         'Ab', 'Bb', 'C', 'C#', 'Eb', 'F', 'G'),
  },
  'A': {
    scale: 'major',
    notes: getScaleNotes('A', 'B', 'C#', 'D', 'E', 'F#', 'Ab',
                         'A', 'B', 'C#', 'D', 'E', 'F#', 'Ab'),
  },
  'Bb': {
    scale: 'major',
    notes: getScaleNotes('Bb', 'C', 'D', 'Eb', 'F', 'G', 'A',
                         'Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'),
  },
  'B': {
    scale: 'major',
    notes: getScaleNotes('B', 'C#', 'Eb', 'E', 'F#', 'Ab', 'Bb',
                         'B', 'C#', 'Eb', 'E', 'F#', 'Ab', 'Bb'),
  },
};


export function getScaleNotes(...noteNames) {
  // Return a list of note IDs for a sequence of note names.
  // The list is in reference to 0 (middle C) so it can be applied
  // as chord offsets.
  var allNoteIds = [];

  function copyScaleKeys() {
    return MASTER_SCALE.map((value, key) => key);
  }

  function nextNoteId() {
    return MASTER_SCALE_MAP[noteNames.shift()];
  }

  var scaleKeys = copyScaleKeys();
  var modifier = 0;
  var noteId = nextNoteId();

  // Walk the scale, matching up each note name with its key.
  // Each time we loop through the scale, increase the numeric
  // key value by 12 so that higher formulas (9th, 11th chords)
  // can be applied.
  while (true) {
    let scaleId = scaleKeys.shift();

    if (scaleId === noteId) {
      allNoteIds.push(noteId + modifier);
      noteId = nextNoteId();
      if (noteId === undefined) {
        break;
      }
    }
    if (scaleKeys.length === 0) {
      scaleKeys = copyScaleKeys();
      modifier += MASTER_SCALE.length;
    }
  }

  return allNoteIds;
}
