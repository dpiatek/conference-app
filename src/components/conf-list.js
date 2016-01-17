import React from 'react';
import Conf from './conf';
import includes from 'lodash/collection/includes';

const ConfList = ({ conferences }) => {
  return (
    <ul>
      {conferences.map(conf => <Conf conf={conf} key={conf.id} />)}
    </ul>
  );
}

export default ConfList;