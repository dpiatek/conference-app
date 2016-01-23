import React, { Component } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/collection/find';
import includes from 'lodash/collection/includes';
import s from './user-conf-list.css';

export class UserConfList extends Component {
  clickHandler(conf) {
    const { cancelCallback, name } = this.props;
    this.props.dispatch(cancelCallback(conf, name));
  }

  render() {
    const { confs } = this.props;

    return (
      <ul className={s.list}>
        {confs.map(conf => {
          return (
            <li className={s.listItem} key={conf.id}>
              <a href="">{conf.name}</a>
              <button className={s.button} onClick={this.clickHandler.bind(this, conf)}>-</button>
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
    confs: conferences.filter(c => includes(c[props.group], name))
  };
}

export default connect(userConfListSelector)(UserConfList);
