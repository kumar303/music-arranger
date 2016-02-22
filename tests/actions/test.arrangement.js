import { expect } from 'chai';

import { applyChordFormula } from 'lib/actions/arrangement';
import { noteName } from 'lib/util/notes';


describe('actions/arrangement', () => {
  describe('applyChordFormula', () => {

    it('requires a valid chordType', () => {
      expect(() => applyChordFormula({root: 0, chordType: 'NOPE'}))
        .to.throw(/unknown chordType: NOPE/);
    });

    it('sets a C major chord from -12', () => {
      let notes = applyChordFormula({root: -12, chordType: 'M'});
      expect(notes).to.be.deep.equal([-12, -8, -5]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'E', 'G']);
    });

    it('sets a C major chord from 0', () => {
      let notes = applyChordFormula({root: 0, chordType: 'M'});
      expect(notes).to.be.deep.equal([0, 4, 7]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'E', 'G']);
    });

    it('sets a B major chord', () => {
      let notes = applyChordFormula({root: 11, chordType: 'm'});
      expect(notes).to.be.deep.equal([11, 14, 18]);
      expect(notes.map(noteName)).to.be.deep.equal(['B', 'D', 'F#']);
    });

    it('sets a C minor chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'm'});
      expect(notes).to.be.deep.equal([0, 3, 7]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'Eb', 'G']);
    });

    it('sets an augmented C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'aug'});
      expect(notes).to.be.deep.equal([0, 4, 8]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'E', 'Ab']);
    });

    it('sets a diminished C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'dim'});
      expect(notes).to.be.deep.equal([0, 3, 6]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'Eb', 'F#']);
    });

    it('sets a sustained 4th C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'sus4'});
      expect(notes).to.be.deep.equal([0, 5, 7]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'F', 'G']);
    });

    it('sets a sustained 2nd C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'sus2'});
      expect(notes).to.be.deep.equal([0, 2, 7]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'D', 'G']);
    });

    it('sets a fifth C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: '5'});
      expect(notes).to.be.deep.equal([0, 7]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'G']);
    });

    it('sets an added 4th C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'add4'});
      expect(notes).to.be.deep.equal([0, 4, 5, 7]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'E', 'F', 'G']);
    });

    it('sets a sixth C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: '6'});
      expect(notes).to.be.deep.equal([0, 4, 7, 9]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'E', 'G', 'A']);
    });

    it('sets a minor sixth C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'm6'});
      expect(notes).to.be.deep.equal([0, 3, 7, 9]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'Eb', 'G', 'A']);
    });

    it('sets a seventh C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: '7'});
      expect(notes).to.be.deep.equal([0, 4, 7, 10]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'E', 'G', 'Bb']);
    });

    it('sets a seventh flat 5th C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: '7b5'});
      expect(notes).to.be.deep.equal([0, 4, 6, 10]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'E', 'F#', 'Bb']);
    });

    it('sets a major seventh C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'M7'});
      expect(notes).to.be.deep.equal([0, 4, 7, 11]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'E', 'G', 'B']);
    });

    it('sets a major ninth C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'M9'});
      expect(notes).to.be.deep.equal([0, 4, 7, 11, 14]);
      expect(notes.map(noteName))
        .to.be.deep.equal(['C', 'E', 'G', 'B', 'D']);
    });

    it('sets a major eleventh C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'M11'});
      expect(notes).to.be.deep.equal([0, 4, 7, 11, 14, 17]);
      expect(notes.map(noteName))
        .to.be.deep.equal(['C', 'E', 'G', 'B', 'D', 'F']);
    });

    it('sets a major 13th C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'M13'});
      expect(notes).to.be.deep.equal([0, 4, 7, 11, 14, 17, 21]);
      expect(notes.map(noteName))
        .to.be.deep.equal(['C', 'E', 'G', 'B', 'D', 'F', 'A']);
    });

    it('sets a minor seventh C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'm7'});
      expect(notes).to.be.deep.equal([0, 3, 7, 10]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'Eb', 'G', 'Bb']);
    });

    it('sets a minor ninth C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'm9'});
      expect(notes).to.be.deep.equal([0, 3, 7, 10, 14]);
      expect(notes.map(noteName))
        .to.be.deep.equal(['C', 'Eb', 'G', 'Bb', 'D']);
    });

    it('sets a minor eleventh C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'm11'});
      expect(notes).to.be.deep.equal([0, 3, 7, 10, 14, 17]);
      expect(notes.map(noteName))
        .to.be.deep.equal(['C', 'Eb', 'G', 'Bb', 'D', 'F']);
    });

    it('sets a minor 13th C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'm13'});
      expect(notes).to.be.deep.equal([0, 3, 7, 10, 14, 17, 21]);
      expect(notes.map(noteName))
        .to.be.deep.equal(['C', 'Eb', 'G', 'Bb', 'D', 'F', 'A']);
    });

    it('sets a minor seventh flat 5th C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: 'm7b5'});
      expect(notes).to.be.deep.equal([0, 3, 6, 10]);
      expect(notes.map(noteName)).to.be.deep.equal(['C', 'Eb', 'F#', 'Bb']);
    });

    it('sets a ninth C chord', () => {
      let notes = applyChordFormula({root: 0, chordType: '9'});
      expect(notes).to.be.deep.equal([0, 4, 7, 10, 14]);
      expect(notes.map(noteName))
        .to.be.deep.equal(['C', 'E', 'G', 'Bb', 'D']);
    });

    it('sets a ninth B chord', () => {
      let notes = applyChordFormula({root: 11, chordType: '9'});
      expect(notes).to.be.deep.equal([11, 15, 18, 21, 25]);
      expect(notes.map(noteName))
        .to.be.deep.equal(['B', 'Eb', 'F#', 'A', 'C#']);
    });

    it('sets a 7 flat 5 + 9th chord', () => {
      let notes = applyChordFormula({root: 0, chordType: '9b5'});
      expect(notes).to.be.deep.equal([0, 4, 6, 10, 14]);
      expect(notes.map(noteName))
        .to.be.deep.equal(['C', 'E', 'F#', 'Bb', 'D']);
    });

  });
});
