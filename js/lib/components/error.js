import React, { Component, PropTypes } from 'react';
import cx from 'classnames';


export default class Error extends Component {

  static propTypes = {
    message: PropTypes.string.isRequired,
  }

  render() {
    var ulClass = cx('notification-list');
    var liClass = cx('notification', 'error');
    return (
      <ul className={ulClass}>
        <li className={liClass}>
          <span className="text">{this.props.message}</span>
        </li>
      </ul>
    );
  }

}
