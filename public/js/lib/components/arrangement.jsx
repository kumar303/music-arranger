import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { noteName } from 'lib/util/notes';
import * as arrangementActions from 'lib/actions/arrangement';


export class Arrangement extends Component {

  static propTypes = {
    arrangement: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.boundArrangement = bindActionCreators(arrangementActions,
                                               props.dispatch);
  }

  setChord(event, {position}) {
    event.preventDefault();
    this.boundArrangement.setCurrentPosition(position);
  }

  renderChords() {
    const empty = <span>&nbsp;</span>;
    let currentPart = this.props.arrangement.currentPart;
    let chords = [];
    let data = this.props.arrangement.parts[currentPart] || [];
    for (let position=0; position < 8; position++) {
      let chordData = data[position] || {};
      chords.push(
        <a  onClick={(event) => this.setChord(event, {position: position})}
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


function select(state) {
  return {
    arrangement: state.arrangement,
  };
}

export default connect(select)(Arrangement);
