import React from 'react';
import Conf from './conf';
import s from './conf-list.css';

const ConfList = ({ conferences }) => {
  return (
    <ul className={s.list}>
      {conferences.map(conf => <Conf conf={conf} key={conf.id} />)}
    </ul>
  );
}

export default ConfList;