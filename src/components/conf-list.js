import React from 'react';
import Conf from './conf';

const ConfList = ({ confsData }) => {
  return (
    <ul>
      {confsData.map(conf =>
        <Conf conf={conf} key={conf.id} />
      )}
    </ul>
  );
}

export default ConfList;