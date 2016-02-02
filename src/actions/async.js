import assign from 'lodash/object/assign';
// Non-native filter is used because it can take either arrays or objects
import filter from 'lodash/collection/filter';

import { viewingConf } from './index.js';

export function addConf(ref, conf) {
  return () => ref.child("conferences").push(conf);
}

export function editConf(ref, newConf, confKey) {
  return dispatch => {
    ref
      .child("conferences")
      .child(confKey)
      .transaction(oldConf => {
        oldConf = oldConf || {};
        return assign({}, oldConf, newConf);
      })
      .then(() => dispatch(viewingConf()))
      .catch(error => console.error(error));
  };
}

export function deleteConf(ref, confKey) {
  return () => ref.child("conferences").child(confKey).remove();
}

export function goToConf(ref, currentUser, confKey) {
  return () => {
    ref
      .child("conferences")
      .child(confKey)
      .transaction(conf => {
        conf = conf || {};
        return assign({}, conf, {
          peopleGoing: (conf.peopleGoing || []).concat([currentUser]),
          peopleInterested: filter((conf.peopleInterested || []), user => user !== currentUser)
        });
      })
  };
}

export function cancelGoToConf(ref, currentUser, confKey) {
  return () => {
    ref
      .child("conferences")
      .child(confKey)
      .transaction(conf => {
        conf = conf || {};
        return assign({}, conf, {
          peopleGoing: filter((conf.peopleGoing || []), user => user !== currentUser)
        });
      })
  };
}

export function interestedInConf(ref, currentUser, confKey) {
  return () => {
    ref
      .child("conferences")
      .child(confKey)
      .transaction(conf => {
        conf = conf || {};
        return assign({}, conf, {
          peopleInterested: (conf.peopleInterested || []).concat([currentUser])
        });
      })
  };
}

export function cancelInterestedInConf(ref, currentUser, confKey) {
  return () => {
    ref
      .child("conferences")
      .child(confKey)
      .transaction(conf => {
        conf = conf || {};
        return assign({}, conf, {
          peopleInterested: filter((conf.peopleInterested || []), user => user !== currentUser)
        });
      })
  };
}
