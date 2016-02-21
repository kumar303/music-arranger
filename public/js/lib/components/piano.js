import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getCurrentChordPart } from 'lib/actions/arrangement';
import PianoKey from 'lib/components/piano-key';
import { PIANO_KEY_START, PIANO_KEY_END } from 'lib/constants/piano';
import { invertChord } from 'lib/util/notes';

// TODO: maybe remove chordNotes from state and calculate it each time the piano is rendered.

export class Piano extends Component {

  static propTypes = {
    arrangement: PropTypes.object.isRequired,
    controls: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.keys = [];
    for (var i = PIANO_KEY_START; i <= PIANO_KEY_END; i++) {
      this.keys.push(<PianoKey key={i} note={i} />);
    }
  }

  prepareKey(chordNotes, key) {
    // TODO: we could maybe detect whether or not the key changed here.
    // If not, it would probably be faster to return the old key object
    // instead of returning a new one each time.
    let props = Object.assign({}, key.props);
    props.isSelected = chordNotes.indexOf(props.note) !== -1;
    return <PianoKey key={props.note} {...props} />;
  }

  render() {
    let chord = getCurrentChordPart(this.props.arrangement);
    let chordNotes = [];
    if (chord.chordNotes) {
      chordNotes = invertChord(this.props.controls.chordInversion,
                               chord.chordNotes);
    }
    return (
      <div id="piano">
        <div className="keys">
          {this.keys.map((key) => this.prepareKey(chordNotes, key))}
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}


function select(state) {
  return {
    controls: state.controls,
    arrangement: state.arrangement,
  };
}

export default connect(select)(Piano);
