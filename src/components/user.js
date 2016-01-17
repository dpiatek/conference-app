import React from 'react';
import UserConfList from './user-conf-list';
import includes from 'lodash/collection/includes';
import { cancelGoToConf, cancelInterestedInConf } from '../actions';

const User = ({ username }) => {
  return (
    <div>
      <p>User: {username}</p>
      <div>Confs you are going to:</div>
      <UserConfList
        cancelCallback={cancelGoToConf}
        group={"peopleGoing"} />

      <div>Maybe also:</div>
      <UserConfList
        cancelCallback={cancelInterestedInConf}
        group={"peopleInterested"} />
    </div>
  );
}

export default User;
