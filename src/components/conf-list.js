import React from 'react';
import Conf from './conf';
import values from 'lodash/object/values';

const ConfList = ({ conferences }) => {
  return (
    <ul>
      {Object
        .keys(conferences)
        .map(key => <Conf conf={conferences[key]} confKey={key} key={key} />)}
    </ul>
  );
}

export default ConfList;