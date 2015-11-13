import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as arrangementActions from 'lib/actions/arrangement';
import ArrangementPart from 'lib/components/arrangement-part';


export class Arrangement extends Component {

  static propTypes = {
    arrangement: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.boundArrangement = bindActionCreators(arrangementActions,
                                               props.dispatch);
  }

  renderParts() {
    var parts = [];
    var partLength = this.props.arrangement.parts.length;
    for (let partNum = 0; partNum < partLength + 1; partNum++) {
      parts.push(
        <ArrangementPart
          key={partNum}
          part={this.props.arrangement.parts[partNum] || []}
          partNum={partNum}
          setPosition={this.boundArrangement.setPosition} />
      );
    }
    return parts;
  }

  render() {
    return (
      <div>
        {this.renderParts()}
      </div>
    );
  }
}


function select(state) {
  return {
    arrangement: state.arrangement,
  };
}

export default connect(select)(Arrangement);
