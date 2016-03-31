import React, { PropTypes } from 'react';
import map from 'lodash/collection/map';
import Conf from './conf';
import s from './conf-list.css';

const ConfList = ({ conferences, fbRef }) => {
  return (
    <ul className={s.list}>
      {map(conferences, (value, key) =>
        <Conf conf={value} confKey={key} key={key} fbRef={fbRef} />
      )}
    </ul>
  );
}

ConfList.propTypes = {
  conferences: PropTypes.object,
  fbRef: PropTypes.object
}

export default ConfList;
