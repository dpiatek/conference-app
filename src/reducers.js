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
  switch (action.type) {
    case ADD_CONF:
      return {
        id: action.conf.id,
        name: action.conf.name,
        topic: action.conf.topic,
        website: action.conf.website,
        dateFrom: action.conf.dateFrom,
        dateTo: action.conf.dateTo,
        peopleGoing: [],
        peopleInterested: []
      }
    case EDIT_CONF:
      return assign({}, state, action.conf);
    default:
      return state;
  }
}

export function conferences(state = [], action) {
  switch (action.type) {
    case ADD_CONF:
      return [
        ...state,
        conference(void 0, action)
      ]
    case EDIT_CONF:
      const editIndex = findIndex(state, c => c.id === action.conf.id);

      return [
        ...state.slice(0, editIndex),
        conference(state[editIndex], action),
        ...state.slice(editIndex + 1)
      ]
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
