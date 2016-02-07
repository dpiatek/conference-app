import React from 'react';
import UserConfList from './user-conf-list';
import includes from 'lodash/collection/includes';
import { cancelGoToConf, cancelInterestedInConf } from '../actions/async';
import { editingConf, viewingConf } from '../actions';
import s from './user.css';


const User = ({ user, fbRef, dispatch, view }) => {
  const logout = () => {
    console.log("Logged out.");
    fbRef.unauth();
  };

  const addConf = () => dispatch(editingConf());
  const closeMenu = () => dispatch(viewingConf());

  const menuOpen = view.adding || view.editing;

  return (
    <header className={s.container}>
      <button onClick={menuOpen ? closeMenu : addConf} className={s.addButton}>
        {menuOpen ? "-" : "+"}
      </button>
      <div>
        <p className={s.userName}>Hi, {user.name}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default User;
