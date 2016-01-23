import React from 'react';
import UserConfList from './user-conf-list';
import includes from 'lodash/collection/includes';
import { cancelGoToConf, cancelInterestedInConf } from '../actions';
import s from './user.css';

const User = ({ username }) => {
  return (
    <header className={s.container}>
      <p className={s.userName}>User: {username}</p>

      <div>
        <span>Confs you are going to:</span>
        <UserConfList
          cancelCallback={cancelGoToConf}
          group={"peopleGoing"} />
      </div>

      <div>
        <span>Maybe also:</span>
        <UserConfList
          cancelCallback={cancelInterestedInConf}
          group={"peopleInterested"} />
      </div>
    </header>
  );
}

export default User;
