import assign from 'lodash/object/assign';
import zipObject from 'lodash/array/zipObject';
import {
  RECEIVE_CONF,
  UPDATE_CONF,
  REMOVE_CONF,
  EDITING_CONF,
  VIEWING_CONF
} from './actions';

export function conference(state = {}, action) {
  let key;
  switch (action.type) {
    case RECEIVE_CONF:
      return { [action.confKey]: action.conf };
    case UPDATE_CONF:
      return { [action.confKey]: assign({}, state, {
        name: action.conf.name,
        topic: action.conf.topic,
        website: action.conf.website,
        dateFrom: action.conf.dateFrom,
        dateTo: action.conf.dateTo,
        peopleGoing: action.conf.peopleGoing,
        peopleInterested: action.conf.peopleInterested
      }) };
    case REMOVE_CONF:
    default:
      return state;
  }
}

export function conferences(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CONF:
      return assign({}, state, conference(void 0, action))
    case UPDATE_CONF:
      return assign({}, state, conference(state[action.confKey], action))
    case REMOVE_CONF:
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

export function view(state = {}, action) {
  switch (action.type) {
    case EDITING_CONF:
      const adding = !action.confKey;
      return assign({}, state, { editing: action.confKey, adding: adding });
    case VIEWING_CONF:
      return assign({}, state, { editing: null, adding: false });
    default:
      return state;
  }
}
