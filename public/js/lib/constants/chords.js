
function buildChordMap() {

  function flat(position) {
    return {position: position, modifier: (note) => note - 1};
  }

  function sharp(position) {
    return {position: position, modifier: (note) => note + 1};
  }

  return [
    // Major:
    {key: 'M', name: 'Major triad', formula: [1, 3, 5]},
    {key: 'add4', name: 'Added 4th', formula: [1, 3, 4, 5]},
    {key: '6', name: 'Sixth', formula: [1, 3, 5, 6]},
    {key: 'M7', name:'Major 7th', formula: [1, 3, 5, 7]},
    {key: 'M9', name:'Major 9th', formula: [1, 3, 5, 7, 9]},
    {key: 'M11', name:'Major 11th', formula: [1, 3, 5, 7, 9, 11]},
    {key: 'M13', name:'Major 13th', formula: [1, 3, 5, 7, 9, 11, 13]},

    // Minor:
    {key: 'm', name: 'Minor triad', formula: [1, flat(3), 5]},
    {key: 'm6', name: 'Minor 6th', formula: [1, flat(3), 5, 6]},
    {key: 'm7', name: 'Minor 7th', formula: [1, flat(3), 5, flat(7)]},
    {key: 'm7b5', name: 'Minor 7th Flat 5',
     formula: [1, flat(3), flat(5), flat(7)]},
    {key: 'm9', name: 'Minor 9th',
     formula: [1, flat(3), 5, flat(7), 9]},
    {key: 'm11', name:'Minor 11th',
     formula: [1, flat(3), 5, flat(7), 9, 11]},
    {key: 'm13', name:'Minor 13th',
     formula: [1, flat(3), 5, flat(7), 9, 11, 13]},

    // Dominant
    {key: '7', name: 'Seventh', formula: [1, 3, 5, flat(7)]},
    {key: '9', name: 'Ninth', formula: [1, 3, 5, flat(7), 9]},
    {key: '7b5', name: 'Seven Flat 5',
     formula: [1, 3, flat(5), flat(7)]},
    {key: '9b5', name: 'Nine Flat 5',
     formula: [1, 3, flat(5), flat(7), 9]},

    // Symmetrical
    {key: 'dim', name: 'Diminished', formula: [1, flat(3), flat(5)]},
    {key: 'aug', name: 'Augmented', formula: [1, 3, sharp(5)]},

    // Miscellaneous
    {key: 'sus4', name: 'Suspended 4th', formula: [1, 4, 5]},
    {key: 'sus2', name: 'Suspended 2nd', formula: [1, 2, 5]},
    {key: '5', name: 'Fifth', formula: [1, 5]},
  ];
}


export const CHORD_MAP_NAMES = buildChordMap();
export var CHORD_FORMULAS = {};

CHORD_MAP_NAMES.forEach((chord) => {
  CHORD_FORMULAS[chord.key] = chord.formula;
});
