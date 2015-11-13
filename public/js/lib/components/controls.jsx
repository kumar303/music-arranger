import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from 'lib/actions/app';
import * as controlActions from 'lib/actions/controls';
import * as arrangementActions from 'lib/actions/arrangement';


export class Controls extends Component {

  static propTypes = {
    arrangement: PropTypes.object.isRequired,
    controls: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.boundAppActions = bindActionCreators(appActions,
                                              props.dispatch);
    this.boundControlActions = bindActionCreators(controlActions,
                                                  props.dispatch);
    this.boundArrangement = bindActionCreators(arrangementActions,
                                               props.dispatch);
  }

  changeChordType(event) {
    event.preventDefault();
    this.boundControlActions.setChordType(event.currentTarget.value);
  }

  changePart(event) {
    event.preventDefault();
    this.boundArrangement.setCurrentPart(parseInt(event.currentTarget.value));
  }

  invertDown(event) {
    event.preventDefault();
    this.boundControlActions.invertChord(-1);
  }

  invertUp(event) {
    event.preventDefault();
    this.boundControlActions.invertChord(1);
  }

  resetInversion(event) {
    event.preventDefault();
    this.boundControlActions.resetChordInversion();
  }

  renderPartSelector() {
    var options = [];
    this.props.arrangement.parts.forEach((data, partNum) => {
      options.push(
        <option key={partNum} value={partNum}>Part {partNum + 1}</option>
      );
    });
    return (
      <select value={this.props.arrangement.currentPart}
          onChange={(...args) => this.changePart(...args)}>
        {options}
      </select>
    );
  }

  render() {
    return (
      <div id="controls">
        {this.renderPartSelector()}
        <button onClick={() => this.boundArrangement.setExportedData()}>
          Export Data
        </button>
        <button onClick={() => this.boundAppActions.resetState()}>
          Clear Data
        </button>
        <span>Chord:</span>
        <select id="chord-select" value={this.props.controls.chordType}
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
        <button className="inverter" onClick={(e) => this.invertDown(e)}>
          Invert Down
        </button>
        <button onClick={(e) => this.resetInversion(e)}>
          {this.props.controls.chordInversion}
        </button>
        <button className="inverter" onClick={(e) => this.invertUp(e)}>
          Invert Up
        </button>
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

export default connect(select)(Controls);
