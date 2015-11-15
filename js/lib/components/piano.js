import React, { Component } from 'react';

import PianoKey from 'lib/components/piano-key';
import { PIANO_KEY_START, PIANO_KEY_END } from 'lib/constants/piano';


export default class Piano extends Component {
  constructor(props) {
    super(props);
    this.keys = [];
    for (var i = PIANO_KEY_START; i <= PIANO_KEY_END; i++) {
      this.keys.push(<PianoKey key={i} note={i} />);
    }
  }

  render() {
    return (
      <div id="piano">
        <div className="keys">
          {this.keys}
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}
