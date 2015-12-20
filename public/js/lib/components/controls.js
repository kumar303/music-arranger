import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from 'lib/actions/app';
import * as controlActions from 'lib/actions/controls';
import * as arrangementActions from 'lib/actions/arrangement';
import { CHORD_MAP_NAMES } from 'lib/constants/piano';


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
    let parts = this.props.arrangement.parts.slice();
    if (!parts.length) {
      // This will render 'Part 1' even when none exist. This should be
      // harmless since you can't change a one-item select box.
      parts.push(null);
    }
    parts.forEach((_, partNum) => {
      options.push(
        <option key={partNum} value={partNum}>Part {partNum + 1}</option>
      );
    });
    return (
      <div className="select-holder">
        <select value={this.props.arrangement.currentPart}
            onChange={(...args) => this.changePart(...args)}>
          {options}
        </select>
      </div>
    );
  }

  render() {
    let chordSelectOptions = CHORD_MAP_NAMES.map((chord) => {
      return <option key={chord.key} value={chord.key}>{chord.name}</option>;
    });
    return (
      <div id="controls">
        {this.renderPartSelector()}
        <span>Chord:</span>
        <div className="select-holder">
          <select id="chord-select" value={this.props.controls.chordType}
              onChange={(...args) => this.changeChordType(...args)}>
            {chordSelectOptions}
          </select>
        </div>
        <span>Invert:</span>
        <button className="inverter" onClick={(e) => this.invertDown(e)}>
          Down
        </button>
        <button onClick={(e) => this.resetInversion(e)}>
          {this.props.controls.chordInversion}
        </button>
        <button className="inverter" onClick={(e) => this.invertUp(e)}>
          Up
        </button>
        <span>Arrangement:</span>
        <button onClick={() => this.boundArrangement.setExportedData()}>
          Export
        </button>
        <button onClick={() => this.boundAppActions.resetState()}>
          Clear
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
