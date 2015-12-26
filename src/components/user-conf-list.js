import React from 'react';
import find from 'lodash/collection/find';

const UserConfList = ({ confs, confsData }) =>
  <ul>
    {confs.map(id => {
      const conf = find(confsData, c => c.id === id);

      return (
        <li key={id}>
          <a href="">{conf.name}</a> <button>-</button>
        </li>
      );
    })}
  </ul>

export default UserConfList;
