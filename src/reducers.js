import find from 'lodash/collection/find';
import assign from 'lodash/object/assign';
import zipObject from 'lodash/array/zipObject';
import {
  ADD_CONF,
  EDIT_CONF,
  DELETE_CONF,
  GO_TO_CONF,
  DONT_GO_CONF,
  INTERESTED_IN_CONF,
  NOT_INTERESTED_IN_CONF
} from './actions';

export function conference(state = {}, action) {
  let key;

  switch (action.type) {
    case ADD_CONF:
      return { [action.confKey]: action.conf };
    case EDIT_CONF:
      return { [action.confKey]: assign({}, state, {
        name: action.conf.name,
        topic: action.conf.topic,
        website: action.conf.website,
        dateFrom: action.conf.dateFrom,
        dateTo: action.conf.dateTo,
        peopleGoing: action.conf.peopleGoing,
        peopleInterested: action.conf.peopleInterested
      }) };
    default:
      return state;
  }
}

export function conferences(state = {}, action) {
  switch (action.type) {
    case ADD_CONF:
      return assign({}, state, conference(void 0, action))
    case EDIT_CONF:
      return assign({}, state, conference(state[action.confKey], action))
    case DELETE_CONF:
      const keys = Object.keys(state).filter(key => key !== action.confKey);
      const values = keys.map(key => state[key]);
      return zipObject(keys, values);
    default:
      return state;
  }
}

export function user(state = {}, action) {
  return state;
}
