import React from 'react';
import User from './user';
import ConfList from './conf-list';
import ConfForm from './conf-form';
import { connect } from 'react-redux';

const App = ({ dispatch, user, conferences, fbRef }) => {
  return (
    <div>
      <User user={user} fbRef={fbRef} />
      <ConfList conferences={conferences} fbRef={fbRef} />
      <ConfForm dispatch={dispatch} fbRef={fbRef} />
    </div>
  );
}

export default connect(state => state)(App);

