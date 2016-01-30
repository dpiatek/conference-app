import React, { Component } from 'react';
import User from './user';
import ConfList from './conf-list';
import ConfForm from './conf-form';
import { connect } from 'react-redux';
import isEqual from 'lodash/lang/isEqual';
import { removeConf, updateConf, receiveConf } from '../actions';

class App extends Component {
  componentDidMount() {
    const { fbRef, dispatch, conferences } = this.props;
    const ref = fbRef.child('conferences');

    ref.on('child_added', snapshot => {
      if (!snapshot || conferences[snapshot.key()]) return;
      dispatch(receiveConf(snapshot.val(), snapshot.key()));
    });

    ref.on('child_removed', snapshot => {
      if (!snapshot) return;
      dispatch(removeConf(snapshot.key()));
    });

    ref.on('child_changed', snapshot => {
      if (!snapshot) return;
      dispatch(updateConf(snapshot.val(), snapshot.key()));
    });
  }

  componentWillUnmount() {
    this.props.fbRef.off();
  }

  render() {
    const { dispatch, user, conferences, fbRef } = this.props;

    return (
      <div>
        <User user={user} fbRef={fbRef} />
        <ConfList conferences={conferences} fbRef={fbRef} />
        <ConfForm dispatch={dispatch} fbRef={fbRef} />
      </div>
    );
  }
}

export default connect(state => state)(App);
