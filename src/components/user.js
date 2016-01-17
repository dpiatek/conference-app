import React from 'react';
import UserConfList from './user-conf-list';
import includes from 'lodash/collection/includes';
import { cancelGoToConf, cancelInterestedInConf } from '../actions';

const User = ({ userData, confsData, dispatch }) => {
  const { name } = userData;

  return (
    <div>
      <p>User: {name}</p>
      <div>Confs you are going to:</div>
      <UserConfList
        dispatch={dispatch}
        name={name}
        cancelCallback={cancelGoToConf}
        confs={confsData.filter(conf => includes(conf.peopleGoing, name))} />

      <div>Maybe also:</div>
      <UserConfList
        dispatch={dispatch}
        name={name}
        cancelCallback={cancelInterestedInConf}
        confs={confsData.filter(conf => includes(conf.peopleInterested, name))} />
    </div>
  );
}

export default User;
