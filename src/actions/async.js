import assign from 'lodash/object/assign';
// Non-native filter is used because it can take either arrays or objects
import filter from 'lodash/collection/filter';

import { viewingConf } from './index.js';

function publicKeysOnly(conf) {
  return {
    name: conf.name || null,
    tags: conf.tags || null,
    website: conf.website || null,
    location: conf.location || null,
    dateFrom: conf.dateFrom || null,
    dateTo: conf.dateTo || null,
    peopleGoing: (conf.peopleGoing || []).map(() => "X"),
    peopleInterested: (conf.peopleInterested || []).map(() => "X")
  }
}

export function addConf(ref, conf) {
  return () => {
    ref.child("conferences").push(conf);
    ref.child("conferences_public").push(conf);
  };
}

export function editConf(ref, newConf, confKey, fbChild = "conferences") {
  return dispatch => {
    ref
      .child(fbChild)
      .child(confKey)
      .transaction(oldConf => {
        oldConf = oldConf || {};
        return assign({}, oldConf, newConf);
      })
      .then(() => fbChild === "conferences" ? dispatch(viewingConf()) : null)
      .then(() => dispatch(editConf(ref, publicKeysOnly(newConf), confKey, "conferences_public")));
  };
}

export function deleteConf(ref, confKey) {
  return () => {
    ref.child("conferences").child(confKey).remove();
    ref.child("conferences_public").child(confKey).remove();
  };
}

export function goToConf(ref, currentUser, confKey) {
  return () => {
    ref
      .child("conferences")
      .child(confKey)
      .transaction(conf => {
        conf = conf || {};

        const newData = assign({}, conf, {
          peopleGoing: (conf.peopleGoing || []).concat([currentUser]),
          peopleInterested: filter((conf.peopleInterested || []), user => user !== currentUser)
        });

        ref
          .child("conferences_public")
          .child(confKey)
          .transaction(() => publicKeysOnly(newData));

        return newData;
      });
  };
}

export function cancelGoToConf(ref, currentUser, confKey) {
  return () => {
    ref
      .child("conferences")
      .child(confKey)
      .transaction(conf => {
        conf = conf || {};
        const newData = assign({}, conf, {
          peopleGoing: filter((conf.peopleGoing || []), user => user !== currentUser)
        });

        ref
          .child("conferences_public")
          .child(confKey)
          .transaction(() => publicKeysOnly(newData));

        return newData;
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
        const newData = assign({}, conf, {
          peopleInterested: (conf.peopleInterested || []).concat([currentUser])
        });

        ref
          .child("conferences_public")
          .child(confKey)
          .transaction(() => publicKeysOnly(newData));

        return newData;
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
        const newData = assign({}, conf, {
          peopleInterested: filter((conf.peopleInterested || []), user => user !== currentUser)
        });

        ref
          .child("conferences_public")
          .child(confKey)
          .transaction(() => publicKeysOnly(newData));

        return newData;
      })
  };
}
