import React from 'react';
import UserConfList from './user-conf-list';
import includes from 'lodash/collection/includes';

const User = ({ userData, confsData }) => {
  const { name } = userData;

  return (
    <div>
      <p>User: {name}</p>
      <div>Confs you are going to:</div>
      <UserConfList
        confs={confsData.filter(conf => includes(conf.peopleGoing, name))} />

      <div>Maybe also:</div>
      <UserConfList
        confs={confsData.filter(conf => includes(conf.peopleInterested, name))} />
    </div>
  );
}

export default User;
