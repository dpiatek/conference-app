import React, { Component, PropTypes } from 'react';
import User from './user';
import ConfForm from './conf-form';
import { connect } from 'react-redux';
import appStyles from './app.css';

class Form extends Component {
  render() {
    const {dispatch, conferences, fbRef, view, routing: { locationBeforeTransitions: { pathname } }} = this.props;
    const editConf = view.adding ? null : conferences[view.editing];

    return (
      <div className={appStyles.container}>
        <div className={appStyles.calendarView}>
          <User fbRef={fbRef} pathname={pathname} />
          <ConfForm
            editConf={editConf}
            editConfKey={view.editing}
            addConf={view.adding}
            dispatch={dispatch}
            fbRef={fbRef} />
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  dispatch: PropTypes.func,
  conferences: PropTypes.object,
  fbRef: PropTypes.object,
  view: PropTypes.object,
  routing: PropTypes.object
}

export default connect(state => state)(Form);
