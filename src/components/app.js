import React, { Component } from 'react';
import User from './user';
import Filters from './filters';
import CalendarView from './calendar-view';
import ConfForm from './conf-form';
import { connect } from 'react-redux';
import isEqual from 'lodash/lang/isEqual';
import { removeConf, updateConf, receiveConf } from '../actions';
import appStyles from './app.css';

class App extends Component {
  constructor() {
    super();
    this.state = { sidebarWidth: null };
  }

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

  setSidebarWidth(sidebarWidth) {
    this.setState({ sidebarWidth });
  }

  render() {
    const { dispatch, user, conferences, fbRef, view } = this.props;
    const sidebarOpen = view.adding || view.editing;
    const sidebarWidth = this.state.sidebarWidth || 0;
    const containerStyles = { transform: `translateX(${Math.round(sidebarWidth)}px)` };
    let editConf;

    if (view.editing) {
      editConf = conferences[view.editing];
    }

    return (
      <div className={appStyles.container}>
        <ConfForm
          sidebarOpen={sidebarOpen}
          sidebarWidth={sidebarWidth}
          editConf={editConf}
          editConfKey={view.editing}
          addConf={view.adding}
          filters={view.filters}
          dispatch={dispatch}
          setFormWidthCallback={this.setSidebarWidth.bind(this)}
          fbRef={fbRef} />
        <div className={appStyles.calendarView} style={sidebarOpen ? containerStyles : {}}>
          <User user={user} fbRef={fbRef} dispatch={dispatch} view={view} />
          <Filters dispatch={dispatch} filters={view.filters} />
          <CalendarView userName={user.name} conferences={conferences} fbRef={fbRef} filters={view.filters} />
        </div>
      </div>
    );
  }
}

export default connect(state => state)(App);
