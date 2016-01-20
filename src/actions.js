import assign from 'lodash/object/assign';
import Firebase from 'firebase';
import Fireproof from 'fireproof';

const apiUrl = "https://blistering-fire-6946.firebaseio.com/conferences";
const ref = new Fireproof(new Firebase(apiUrl));

export const ADD_CONF = "ADD_CONF";
export const EDIT_CONF = "EDIT_CONF";
export const DELETE_CONF = "DELETE_CONF";
export const GO_TO_CONF = "GO_TO_CONF";
export const DONT_GO_CONF = "DONT_GO_CONF";
export const INTERESTED_IN_CONF = "INTERESTED_IN_CONF";
export const NOT_INTERESTED_IN_CONF = "NOT_INTERESTED_IN_CONF";


export function addConf(conf) {
  return (dispatch) => {
    const childRef = ref.push(conf);
    const childRefKey = childRef.key();
    return childRef
      .then(() => dispatch(receiveConf({ [childRefKey]: conf })))
      .catch(error => console.error(error))
  };
}

export function receiveConf(conf) {
  return {
    type: ADD_CONF, conf
  }
}

export function goToConf(currentUser, confKey) {
  return dispatch => {
    return ref
      .child(confKey)
      .transaction((conf = {}) => {
        return assign({}, conf, {
          peopleGoing: (conf.peopleGoing || []).concat([currentUser]),
          peopleInterested: (conf.peopleInterested || []).filter(user => user !== currentUser)
        });
      })
      .then(results => {
        return dispatch(editConf(
          { [confKey]: results.snapshot.val() }, confKey
        ))
      })
      .catch((error) => console.error(error))
  };
}

export function editConf(conf, confKey) {
  return {
    type: EDIT_CONF, conf, confKey
  }
}

export function cancelGoToConf(conf, currentUsername) {
  return {
    type: EDIT_CONF,
    conf: {
      id: conf.id,
      peopleGoing: conf.peopleGoing.filter(username => username !== currentUsername)
    }
  }
}

export function interestedInConf(conf, currentUsername) {
  return {
    type: EDIT_CONF,
    conf: {
      id: conf.id,
      peopleInterested: conf.peopleInterested.concat([currentUsername])
    }
  }
}

export function cancelInterestedInConf(conf, currentUsername) {
  return {
    type: EDIT_CONF,
    conf: {
      id: conf.id,
      peopleInterested: conf.peopleInterested.filter(username => username !== currentUsername)
    }
  }
}
