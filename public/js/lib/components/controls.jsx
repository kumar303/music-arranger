import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appControlsActions from 'lib/actions/app-controls';


export class Controls extends Component {

  static propTypes = {
    appControls: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.boundAppControls = bindActionCreators(appControlsActions,
                                               props.dispatch);
  }

  changeChordType(event) {
    event.preventDefault();
    this.boundAppControls.setChordType(event.currentTarget.value);
  }

  render() {
    return (
      <div id="controls">
        <select id="part">
          <option value="0">Part 1</option>
          <option value="1">Part 2</option>
          <option value="2">Part 3</option>
          <option value="3">Part 4</option>
        </select>
        <button id="export">Export Data</button>
        <button id="clear">Clear Data</button>
        <span>Chord:</span>
        <select id="chord-select" value={this.props.appControls.chordType}
            onChange={(...args) => this.changeChordType(...args)}>
          <option value="">None</option>
          <option value="M">Major</option>
          <option value="m">Minor</option>
          <option value="aug">Augmented</option>
          <option value="dim">Diminished</option>
          <option value="sus4">Sustained 4th</option>
          <option value="sus2">Sustained 2nd</option>
          <option value="5">Fifth</option>
          <option value="6">Sixth</option>
          <option value="m6">Minor 6th</option>
          <option value="7">Seventh</option>
          <option value="M7">Major 7th</option>
          <option value="m7">Minor 7th</option>
        </select>
        <button className="inverter" data-inv="down">Invert Down</button>
        <button className="inverter" data-inv="up">Invert Up</button>
      </div>
    );
  }
}


function select(state) {
  return {
    appControls: state.appControls,
  };
}

export default connect(select)(Controls);
