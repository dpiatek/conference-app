import assign from 'lodash/object/assign';

// Non-native filter is used because it can take either arrays or objects
import filter from 'lodash/collection/filter';

export const ADD_CONF = "ADD_CONF";
export const EDIT_CONF = "EDIT_CONF";
export const DELETE_CONF = "DELETE_CONF";
export const GO_TO_CONF = "GO_TO_CONF";
export const DONT_GO_CONF = "DONT_GO_CONF";
export const INTERESTED_IN_CONF = "INTERESTED_IN_CONF";
export const NOT_INTERESTED_IN_CONF = "NOT_INTERESTED_IN_CONF";

export function addConf(ref, conf) {
  return (dispatch) => {
    const childRef = ref.child("conferences").push(conf);
    const childRefKey = childRef.key();
    return childRef
      .then(() => dispatch(receiveConf(conf, childRefKey)))
      .catch(error => console.error(error))
  };
}

export function goToConf(ref, currentUser, confKey) {
  return dispatch => {
    return ref
      .child("conferences")
      .child(confKey)
      .transaction(conf => {
        conf = conf || {};
        return assign({}, conf, {
          peopleGoing: (conf.peopleGoing || []).concat([currentUser]),
          peopleInterested: filter((conf.peopleInterested || []), user => user !== currentUser)
        });
      })
      .then(results => dispatch(editConf(results.snapshot.val(), confKey)))
      .catch(error => console.error(error))
  };
}

export function cancelGoToConf(ref, currentUser, confKey) {
  return dispatch => {
    return ref
      .child("conferences")
      .child(confKey)
      .transaction(conf => {
        conf = conf || {};
        return assign({}, conf, {
          peopleGoing: filter((conf.peopleGoing || []), user => user !== currentUser)
        });
      })
      .then(results => dispatch(editConf(results.snapshot.val(), confKey)))
      .catch(error => console.error(error))
  };
}

export function interestedInConf(ref, currentUser, confKey) {
  return dispatch => {
    return ref
      .child("conferences")
      .child(confKey)
      .transaction(conf => {
        conf = conf || {};
        return assign({}, conf, {
          peopleInterested: (conf.peopleInterested || []).concat([currentUser])
        });
      })
      .then(results => dispatch(editConf(results.snapshot.val(), confKey)))
      .catch(error => console.error(error))
  };
}

export function cancelInterestedInConf(ref, currentUser, confKey) {
  return dispatch => {
    return ref
      .child("conferences")
      .child(confKey)
      .transaction(conf => {
        conf = conf || {};
        return assign({}, conf, {
          peopleInterested: filter((conf.peopleInterested || []), user => user !== currentUser)
        });
      })
      .then(results => dispatch(editConf(results.snapshot.val(), confKey)))
      .catch(error => console.error(error))
  };
}

export function receiveConf(conf, confKey) {
  return { type: ADD_CONF, conf, confKey };
}

export function editConf(conf, confKey) {
  return { type: EDIT_CONF, conf, confKey };
}
