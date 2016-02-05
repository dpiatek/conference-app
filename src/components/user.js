import React from 'react';
import UserConfList from './user-conf-list';
import includes from 'lodash/collection/includes';
import { cancelGoToConf, cancelInterestedInConf } from '../actions/async';
import s from './user.css';


const User = ({ user, fbRef }) => {
  const logout = () => {
    console.log("Logged out.")
    fbRef.unauth();
  }

  return (
    <header className={s.container}>
      {
        user.profileImage &&
        <img className={s.profileImage} src={user.profileImage} alt={user.name} />
      }

      <div>
        <p className={s.userName}>User: {user.name}</p>
        <button onClick={logout}>Logout</button>
      </div>

      <div>
        <span>Confs you are going to:</span>
        <UserConfList
          cancelCallback={cancelGoToConf}
          fbRef={fbRef}
          group={"peopleGoing"} />
      </div>

      <div>
        <span>Maybe also:</span>
        <UserConfList
          cancelCallback={cancelInterestedInConf}
          fbRef={fbRef}
          group={"peopleInterested"} />
      </div>
    </header>
  );
}

export default User;
