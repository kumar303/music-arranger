import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as pianoActions from 'lib/actions/piano';

const blackKeys = {
  1: 1,
  3: 3,
  6: 1,
  8: 2,
  10: 3,
};


export class PianoKey extends Component {
  // TODO: should probably move a lot of this logic to <Piano> for speed.

  static propTypes = {
    controls: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    note: PropTypes.number.isRequired,
    pianoView: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.blackKeyNum = blackKeys[(props.note % 12) +
                                 (props.note < 0 ? 12 : 0)];
    this.boundPianoActions = bindActionCreators(pianoActions, props.dispatch);
  }

  onClick(event) {
    event.preventDefault();
    this.boundPianoActions.touchNote(this.props.note);
  }

  isSelected(note) {
    let chordNotes = this.props.pianoView.chordNotes;
    let chordInversion = this.props.controls.chordInversion;
    if (chordInversion !== 0) {
      for (let inv=1; inv <= Math.abs(chordInversion); inv++) {
        chordNotes = this.invertChord(this.props.controls.chordInversion,
                                      chordNotes);
      }
    }
    return chordNotes.indexOf(note) !== -1;
  }

  invertChord(inversion, notes) {
    var changedNote;
    var modifiedNotes = notes.slice();
    if (inversion > 0) {
      var first = modifiedNotes.shift();
      changedNote = first + 12;
      if (changedNote > 12) {
        console.log('inversion out of bounds');
        return notes;
      }
      modifiedNotes.push(changedNote);
    } else {
      var last = modifiedNotes.pop();
      changedNote = last - 12;
      if (changedNote < -12) {
        console.log('inversion out of bounds');
        return notes;
      }
      modifiedNotes.splice(0, 0, changedNote);
    }
    return modifiedNotes;
  }

  render() {
    var cls = 'key' + (this.blackKeyNum ?
                       ' black black' + this.blackKeyNum : '');
    if (this.isSelected(this.props.note)) {
      cls += ' pressed';
    }
    return (
      <div onClick={(...args) => this.onClick(...args)} className={cls} />
    );
  }
}


function select(state) {
  return {
    controls: state.controls,
    pianoView: state.pianoView,
  };
}

export default connect(select)(PianoKey);
