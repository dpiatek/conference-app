import assign from 'lodash/object/assign';

// Non-native filter is used because it can take either arrays or objects
import filter from 'lodash/collection/filter';

export const RECEIVE_CONF = "RECEIVE_CONF";
export const UPDATE_CONF = "UPDATE_CONF";
export const REMOVE_CONF = "REMOVE_CONF";
export const EDITING_CONF = "EDITING_CONF";
export const VIEWING_CONF = "VIEWING_CONF";

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

export function receiveConf(conf, confKey) {
  return { type: RECEIVE_CONF, conf, confKey };
}

export function updateConf(conf, confKey) {
  return { type: UPDATE_CONF, conf, confKey };
}

export function removeConf(confKey) {
  return { type: REMOVE_CONF, confKey };
}

export function editingConf(confKey) {
  return { type: EDITING_CONF, confKey };
}

export function viewingConf(confKey) {
  return { type: VIEWING_CONF };
}
