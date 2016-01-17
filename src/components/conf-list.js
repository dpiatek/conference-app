import React from 'react';
import Conf from './conf';
import any from 'lodash/collection/any';

const ConfList = ({ userData, confsData, dispatch }) => {
  return (
    <ul>
      {confsData.map(conf => {
        const attending = any(userData.goingToConfs, id => conf.id === id);
        const interested = any(userData.interestedInConfs, id => conf.id === id);

        return (
          <Conf
            attending={attending}
            interested={interested}
            conf={conf}
            key={conf.id}
            dispatch={dispatch} />);
      })}
    </ul>
  );
}

export default ConfList;