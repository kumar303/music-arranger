'use strict';

var React = require('react');

var blackKeys = {
  1: 1,
  3: 3,
  6: 1,
  8: 2,
  10: 3,
};

module.exports = React.createClass({

  displayName: 'PianoKey',

  getInitialState: function() {
    return {
      blackKeyNum: blackKeys[(this.props.note % 12) +
                             (this.props.note < 0 ? 12 : 0)],
    };
  },

  render () {
    var cls = 'key' + (this.state.blackKeyNum ?
                       ' black black' + this.state.blackKeyNum: '');
    return (
        <div className={cls} />
    );
  },

});
