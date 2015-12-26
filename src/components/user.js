import React from 'react';
import UserConfList from './user-conf-list';

const User = ({ userData, confsData }) => {
  const {
    name,
    goingToConfs: goingToConfs = [],
    interestedInConfs: interestedInConfs = []
  } = userData;

  return (
    <div>
      <p>User: {name}</p>
      <div>Confs you are going to:</div>
      <UserConfList confs={goingToConfs} confsData={confsData} />

      <div>Maybe also:</div>
      <UserConfList confs={interestedInConfs} confsData={confsData} />
    </div>
  );
}

export default User;
