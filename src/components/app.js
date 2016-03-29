import React, { Component, PropTypes } from 'react';
import User from './user';
import Filters from './filters';
import CalendarView from './calendar-view';
import { connect } from 'react-redux';
import { removeConf, updateConf, receiveConf } from '../actions';
import appStyles from './app.css';

class App extends Component {
  componentDidMount() {
    const { fbRef, conferences } = this.props;
    const ref = fbRef.child('conferences');

    ref.on('child_added', snapshot => {
      if (!snapshot || conferences[snapshot.key()]) return;
      this.props.receiveConf(snapshot.val(), snapshot.key());
    });

    ref.on('child_removed', snapshot => {
      if (!snapshot) return;
      this.props.removeConf(snapshot.key());
    });

    ref.on('child_changed', snapshot => {
      if (!snapshot) return;
      this.props.updateConf(snapshot.val(), snapshot.key());
    });
  }

  componentWillUnmount() {
    this.props.fbRef.off();
  }

  render() {
    const {
      fbRef,
      view,
      routing: {
        locationBeforeTransitions: {
          pathname
        }
      }
    } = this.props;

    return (
      <div className={appStyles.container}>
        <div className={appStyles.calendarView}>
          <User fbRef={fbRef} pathname={pathname} />
          {view.showFilters ? <Filters /> : null}
          <CalendarView fbRef={fbRef} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fbRef: PropTypes.object,
  conferences: PropTypes.object,
  receiveConf: PropTypes.func,
  removeConf: PropTypes.func,
  updateConf: PropTypes.func,
  routing: PropTypes.object,
  view: PropTypes.object
};

const mapState = state => state;
const mapDispatch = (dispatch) => ({
  receiveConf: (val, key) => dispatch(receiveConf(val, key)),
  removeConf: (key) => dispatch(removeConf(key)),
  updateConf: (val, key) => dispatch(updateConf(val, key))
})

export default connect(mapState, mapDispatch)(App);
