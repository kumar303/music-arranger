'use strict';

var React = require('react');

module.exports = React.createClass({

  displayName: 'Arrangement',

  render () {
    return (
      <div className="arrangement" id="notes">
        <div className="elements"></div>
        <div className="clear"></div>
      </div>
    );
  },

});
