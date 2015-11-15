import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from 'lib/actions/app';
import * as arrangementActions from 'lib/actions/arrangement';

import Arrangement from 'lib/components/arrangement';
import Controls from 'lib/components/controls';
import Piano from 'lib/components/piano';
import Error from 'lib/components/error';
import ExportedData from 'lib/components/exported-data';


export class App extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    arrangement: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.boundAppActions = bindActionCreators(appActions, props.dispatch);
    this.boundArrangement = bindActionCreators(arrangementActions,
                                               props.dispatch);
  }

  render() {
    if (this.props.app.error) {
      return <Error message={this.props.app.error} />;
    }
    let addedComponents = [];
    if (this.props.arrangement.exportedData) {
      addedComponents.push(
        <ExportedData
          key="exported-data"
          data={this.props.arrangement.exportedData}
          clearData={this.boundArrangement.clearExportedData}
        />
      );
    }
    return (
      <div id="content">
        {addedComponents}
        <Controls/>
        <Piano/>
        <Arrangement/>
      </div>
    );
  }
}


function select(state) {
  return {
    app: state.app,
    arrangement: state.arrangement,
  };
}

export default connect(select)(App);
