import React from 'react';
import find from 'lodash/collection/find';

const UserConfList = ({ confs }) =>
  <ul>
    {confs.map(conf => {
      return (
        <li key={conf.id}>
          <a href="">{conf.name}</a> <button>-</button>
        </li>
      );
    })}
  </ul>

export default UserConfList;
