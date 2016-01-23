import React from 'react';
import User from './user';
import ConfList from './conf-list';
import ConfForm from './conf-form';
import { connect } from 'react-redux';

const App = ({ dispatch, user, conferences, fbRef }) => {
  const logout = () => {
    fbRef.unauth();
    document.location.reload();
  }

  return (
    <div>
      <User username={user.name} />
      <ConfList conferences={conferences} />
      <ConfForm dispatch={dispatch} />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default connect(state => state)(App);

