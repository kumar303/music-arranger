import { CHORD_FORMULAS } from 'lib/constants/chords';
import { MASTER_SCALE,
         MASTER_SCALE_MAP,
         SCALES } from 'lib/constants/scales';
import { PIANO_KEY_START, PIANO_KEY_END } from 'lib/constants/piano';



export function noteName(noteNum) {
  // Keep shifting until the note is in the 0-11 range so we can return its
  // name. There is probably a way better way to do this with magic math.
  var scaleLength = MASTER_SCALE.length;
  var shift;
  var counter = 0;
  var name;

  if (isNaN(noteNum)) {
    throw new Error(`noteNum must be a number; got ${noteNum}`);
  }

  if (noteNum < 0) {
    shift = function(num) {
      return num + scaleLength;
    };
  } else {
    shift = function(num) {
      return num - scaleLength;
    };
  }

  while (true) {
    name = MASTER_SCALE[noteNum];
    if (typeof name !== 'undefined') {
      return name;
    }
    noteNum = shift(noteNum);

    if (counter > 30) {
      throw new Error('too much recursion');
    }
    counter++;
  }
}


export function chordName(chordData) {
  // Get the short name of a chord, like Cm7 for C minor 7.
  let note = noteName(chordData.chordRoot);
  return `${note}${chordData.chordType}`;
}


export function invertChord(inversion, notes) {
  let modifiedNotes = notes.slice();
  if (inversion !== 0) {
    for (let inv=1; inv <= Math.abs(inversion); inv++) {
      modifiedNotes = applyChordInversion(inversion, modifiedNotes);
    }
  }
  return modifiedNotes;
}


export function applyChordFormula({root, chordType}) {
  // Given a root (anywhere on the keyboard), apply a chord formula
  // to return a list of all chord notes.
  let formula = CHORD_FORMULAS[chordType];
  if (formula === undefined) {
    throw new Error(`unknown chordType: ${chordType} (or undefined formula)`);
  }

  let rootName = noteName(root);
  let rootOffset = MASTER_SCALE_MAP[rootName];
  // Get all the notes in this root's scale.
  let scaleNotes = SCALES[rootName].notes;

  return formula.map((pos) => {
    let modifier;
    if (pos.modifier) {
      // Prepare to apply a modifier, such as flat() or sharp()
      // which would adjust the note number.
      modifier = pos.modifier;
      pos = pos.position;
    }
    let noteInPosition = scaleNotes[pos - 1];
    if (noteInPosition === undefined) {
      throw new Error(
        `Position ${pos} missing from scale ${rootName}, ${chordType}`);
    }
    // Apply the scale position for this part of the chord.
    // Also adjust the positions based on where the tonic of the scale
    // starts. For example, D needs to move back -1 numbers.
    let note = root + noteInPosition - rootOffset;
    if (modifier) {
      note = modifier(note);
    }
    return note;
  });
}


function applyChordInversion(inversion, notes) {
  var changedNote;
  var modifiedNotes = notes.slice();
  if (inversion > 0) {
    var first = modifiedNotes.shift();
    changedNote = first + 12;
    if (changedNote > PIANO_KEY_END) {
      console.log('inversion out of bounds');
      return notes;
    }
    modifiedNotes.push(changedNote);
  } else {
    var last = modifiedNotes.pop();
    changedNote = last - 12;
    if (changedNote < PIANO_KEY_START) {
      console.log('inversion out of bounds');
      return notes;
    }
    modifiedNotes.splice(0, 0, changedNote);
  }
  return modifiedNotes;
}
