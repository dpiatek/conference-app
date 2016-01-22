import React from 'react';
import values from 'lodash/object/values';
import Conf from './conf';
import s from './conf-list.css';

const ConfList = ({ conferences, fbRef }) => {
  return (
    <ul className={s.list}>
      {Object
        .keys(conferences)
        .map(key => <Conf conf={conferences[key]} confKey={key} key={key} fbRef={fbRef} />)}
    </ul>
  );
}

export default ConfList;