import React from 'react';
import Conf from './conf';
import includes from 'lodash/collection/includes';

const ConfList = ({ userData, confsData, dispatch }) => {
  return (
    <ul>
      {confsData.map(conf => {
        const attending = includes(conf.peopleGoing, userData.name);
        const interested = includes(conf.peopleInterested, userData.name);

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