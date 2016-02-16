import { expect } from 'chai';
import { noteName } from 'lib/util/notes';


describe('util/notes', () => {
  describe('noteName', () => {

    it('requires a number', () => {
      expect(() => noteName('garbage')).to.throw(/must be a number/);
    });

    it('returns middle C', () => {
      expect(noteName(0)).to.be.equal('C');
    });

    it('returns high C', () => {
      expect(noteName(48)).to.be.equal('C');
    });

    it('returns low C', () => {
      expect(noteName(-12)).to.be.equal('C');
    });

    it('returns high B', () => {
      expect(noteName(23)).to.be.equal('B');
    });

  });
});
