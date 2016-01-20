import findIndex from 'lodash/array/findIndex';
import find from 'lodash/collection/find';
import assign from 'lodash/object/assign';
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
      key = Object.keys(action.conf);
      const { name, topic, website, dateFrom, dateTo } = action.conf[key];
      const conf = { name, topic, website, dateFrom, dateTo };

      return { [key]: conf };
    case EDIT_CONF:
      key = Object.keys(action.conf);
      return { [key]: assign({}, state, action.conf[key]) } ;
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
      const delIndex = findIndex(state, c => c.id === action.conf.id);

      return [
        ...state.slice(0, delIndex),
        ...state.slice(delIndex + 1)
      ]
    default:
      return state;
  }
}

export function user(state = {}, action) {
  return state;
}
