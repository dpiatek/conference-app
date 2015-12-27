import React from 'react';
import User from './user';
import ConfList from './conf-list';
import ConfForm from './conf-form';
import { connect } from 'react-redux';

const App = ({ dispatch, user, conferences }) => {
  return (
    <div>
      <User userData={user} confsData={conferences} />
      <ConfList confsData={conferences} />
      <ConfForm dispatch={dispatch} />
    </div>
  );
}

export default connect(state => state)(App);

