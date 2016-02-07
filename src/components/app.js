import React, { Component } from 'react';
import User from './user';
import CalendarView from './calendar-view';
import ConfForm from './conf-form';
import { connect } from 'react-redux';
import isEqual from 'lodash/lang/isEqual';
import { removeConf, updateConf, receiveConf } from '../actions/async';
import appStyles from './app.css';

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
    const { dispatch, user, conferences, fbRef, view } = this.props;
    let editConf;

    if (view.editing) {
      editConf = conferences[view.editing];
    }

    return (
      <div className={appStyles.container}>
        <ConfForm
          editConf={editConf}
          editConfKey={view.editing}
          addConf={view.adding}
          dispatch={dispatch}
          fbRef={fbRef} />
        <div className={appStyles.calendarView}>
          <User user={user} fbRef={fbRef} dispatch={dispatch} view={view} />
          <CalendarView conferences={conferences} fbRef={fbRef} />
        </div>
      </div>
    );
  }
}

export default connect(state => state)(App);
