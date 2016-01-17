import React from 'react';
import Conf from './conf';

const ConfList = ({ conferences }) => {
  return (
    <ul>
      {conferences.map(conf => <Conf conf={conf} key={conf.id} />)}
    </ul>
  );
}

export default ConfList;