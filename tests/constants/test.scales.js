import { expect } from 'chai';

import { getScaleNotes } from 'lib/constants/scales';


describe('constants/scales', () => {
  describe('getScaleNotes', () => {

    it('returns note IDs', () => {
      expect(getScaleNotes('C', 'D')).to.be.deep.equal([0, 2]);
    });

    it('can wrap around the scale', () => {
      expect(getScaleNotes('B', 'B', 'B', 'B'))
        .to.be.deep.equal([11, 23, 35, 47]);
    });

    it('can step around scale boundaries', () => {
      expect(getScaleNotes('G', 'Ab', 'A', 'B', 'D', 'E'))
        .to.be.deep.equal([7, 8, 9, 11, 14, 16]);
    });

    it('can define a C scale', () => {
      expect(getScaleNotes('C', 'D', 'E', 'F', 'G', 'A', 'B',
                           'C', 'D', 'E', 'F'))
        .to.be.deep.equal([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17]);
    });

  });
});
