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

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    note: PropTypes.number.isRequired,
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

  render() {
    var cls = 'key' + (this.blackKeyNum ?
                       ' black black' + this.blackKeyNum : '');
    if (this.props.isSelected) {
      cls += ' pressed';
    }
    return (
      <div onClick={(...args) => this.onClick(...args)} className={cls} />
    );
  }
}


// This only connects to Redux so it can get a dispatch() method.
function select() {
  return {};
}

export default connect(select)(PianoKey);
