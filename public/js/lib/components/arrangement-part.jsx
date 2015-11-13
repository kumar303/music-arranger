import React, { Component, PropTypes } from 'react';

import { noteName } from 'lib/util/notes';


export default class ArrangementPart extends Component {

  static propTypes = {
    part: PropTypes.array.isRequired,
    partNum: PropTypes.number.isRequired,
    setPosition: PropTypes.func.isRequired,
  }

  setPosition(event, position) {
    event.preventDefault();
    this.props.setPosition(this.props.partNum, position);
  }

  renderChords() {
    const empty = <span>&nbsp;</span>;
    let chords = [];
    for (let position=0; position < 8; position++) {
      let chordData = this.props.part[position] || {};
      chords.push(
        <a  onClick={(e) => this.setPosition(e, position)}
            href="#" key={position}>
          {typeof chordData.chordRoot !== 'undefined' ?
              noteName(chordData.chordRoot) : empty}
        </a>
      );
    }
    return chords;
  }

  render() {
    return (
      <div className="arrangement">
        <div className="elements">
          {this.renderChords()}
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}
