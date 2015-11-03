'use strict';

var React = require('react');

var PianoKey = require('piano-key');

module.exports = React.createClass({

  displayName: 'Piano',

  getInitialState: function() {
    var keys = [];
    for (var i = -12; i < 14; i++) {
      keys.push(<PianoKey key={i} note={i} />);
    }
    return {
      keys: keys,
    };
  },

  render () {
    return (
      <div id="piano">
        <div className="keys">
          {this.state.keys}
        </div>
        <div className="clear"></div>
      </div>
    );
  },

});
