import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from 'lib/actions/app-actions';

import Arrangement from 'lib/components/arrangement';
import Controls from 'lib/components/controls';
import Piano from 'lib/components/piano';
import Error from 'lib/components/error';


export class App extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.boundAppActions = bindActionCreators(appActions, props.dispatch);
  }

  render() {
    if (this.props.app.error) {
      return <Error message={this.props.app.error} />;
    }
    return (
      <div id="content">
        <Controls />
        <Piano />
        <Arrangement />
        <div id="circle"></div>
      </div>
    );
  }
}


function select(state) {
  return {
    app: state.app,
  };
}

export default connect(select)(App);
