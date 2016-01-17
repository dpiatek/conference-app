import React, { Component } from 'react';
import find from 'lodash/collection/find';

export default class UserConfList extends Component {
  clickHandler(conf) {
    const { cancelCallback, name } = this.props;
    this.props.dispatch(cancelCallback(conf, name));
  }

  render() {
    const { confs } = this.props;

    return (
      <ul>
        {confs.map(conf => {
          return (
            <li key={conf.id}>
              <a href="">{conf.name}</a>
              <button onClick={this.clickHandler.bind(this, conf)}>-</button>
            </li>
          );
        })}
      </ul>
    );
  }
}
