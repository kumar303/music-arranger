import React, { Component } from 'react';

const blackKeys = {
  1: 1,
  3: 3,
  6: 1,
  8: 2,
  10: 3,
};


export default class PianoKey extends Component {
  constructor(props) {
    super(props);
    this.blackKeyNum = blackKeys[(props.note % 12) +
                                 (props.note < 0 ? 12 : 0)];
  }

  render() {
    var cls = 'key' + (this.blackKeyNum ?
                       ' black black' + this.blackKeyNum: '');
    return (
        <div className={cls} />
    );
  }
}
