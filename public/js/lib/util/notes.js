import { NOTE_NAMES } from 'lib/constants/piano';


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
