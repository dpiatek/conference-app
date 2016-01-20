import React, { Component } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/collection/find';
import includes from 'lodash/collection/includes';
import values from 'lodash/object/values';

export class UserConfList extends Component {
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

export function userConfListSelector(state, props, dispatch) {
  const { user: { name }, conferences } = state;

  return {
    name, dispatch,
    confs: values(conferences).filter(c => includes(c[props.group], name))
  };
}

export default connect(userConfListSelector)(UserConfList);
