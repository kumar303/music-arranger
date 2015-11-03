'use strict';

var React = require('react');

var Arrangement = require('arrangement');
var Controls = require('controls');
var Piano = require('piano');

var App = React.createClass({

  displayName: 'App',

  getInitialState: function() {
    return {};
  },

  render () {
    return (
      <div id="content">
        <Controls />
        <Piano />
        <Arrangement />
        <div id="circle"></div>
      </div>
    );
  },
});


module.exports = {
  init: function() {
    React.render(<App/>, document.body);
  },
};
