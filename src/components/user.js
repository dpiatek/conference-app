import React from 'react';
import UserConfList from './user-conf-list';
import includes from 'lodash/collection/includes';
import { cancelGoToConf, cancelInterestedInConf } from '../actions';
import s from './user.css';


const User = ({ username, fbRef }) => {
  const logout = () => {
    fbRef.unauth();
    document.location.reload();
  }

  return (
    <header className={s.container}>
      <div>
        <p className={s.userName}>User: {username}</p>
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
