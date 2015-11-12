
const NOTE_NAMES = {
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


export function noteName(noteNum) {
  // Keep shifting until the note is in the 0-12 range so we can return its
  // name. There is probably a way better way to do this with magic math.
  var shift;
  if (noteNum < 0) {
    shift = function(num) {
      return num + 12;
    };
  } else {
    shift = function(num) {
      return num - 12;
    };
  }

  var name;
  while (true) {
    name = NOTE_NAMES[noteNum];
    if (typeof name !== 'undefined') {
      return name;
    }
    noteNum = shift(noteNum);
  }
}
