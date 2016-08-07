import { assert } from 'chai';
import React from 'react';
import {
  findRenderedComponentWithType, renderIntoDocument
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import ArrangementPart from 'lib/components/arrangement-part';

function getElement(
  {
    currentPart=0,
    currentPosition=0,
    part=[],
    partNum=0,
    setPosition=sinon.stub(),
  } = {}) {
    return findRenderedComponentWithType(renderIntoDocument(
      <ArrangementPart
        currentPart={currentPart}
        currentPosition={currentPosition}
        part={part}
        partNum={partNum}
        setPosition={setPosition}
      />
    ), ArrangementPart);
  }


describe('ArrangementPart', () => {

  it('renders one chord', () => {
    const elem = findDOMNode(getElement({
      part: [{
        // C major triad
        chordRoot: -12,
        chordType: 'M',
      }],
    }));
    assert.equal(elem.textContent.trim(), 'CM');
  });

  it('renders two chords', () => {
    const elem = findDOMNode(getElement({
      part: [{
        // C major triad
        chordRoot: -12,
        chordType: 'M',
      }, {
        // D minor triad
        chordRoot: -10,
        chordType: 'm',
      }],
    }));
    assert.equal(elem.textContent.trim(), 'CMDm');
  });

});
