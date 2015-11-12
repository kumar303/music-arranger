import React, { Component } from 'react';

import PianoKey from 'lib/components/piano-key';


export default class Piano extends Component {
  constructor(props) {
    super(props);
    this.keys = [];
    for (var i = -12; i < 14; i++) {
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
