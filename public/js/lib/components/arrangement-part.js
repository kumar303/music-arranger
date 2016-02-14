import React, { Component, PropTypes } from 'react';

import { chordName } from 'lib/util/notes';


export default class ArrangementPart extends Component {

  static propTypes = {
    currentPart: PropTypes.number.isRequired,
    currentPosition: PropTypes.number.isRequired,
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
      let cls = (this.props.currentPart === this.props.partNum &&
                 this.props.currentPosition === position) ? 'active' : '';
      chords.push(
        <a  onClick={(e) => this.setPosition(e, position)}
            href="#" key={position} className={cls} >
          {typeof chordData.chordRoot !== 'undefined' ?
              chordName(chordData) : empty}
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
