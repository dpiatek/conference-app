import assign from 'lodash/object/assign';
import filter from 'lodash/collection/filter';
import zipObject from 'lodash/array/zipObject';

import * as types from './actions/types';

export function conference(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_CONF:
      return { [action.confKey]: action.conf };
    case types.UPDATE_CONF:
      return { [action.confKey]: assign({}, state, { ...action.conf }) };
    case types.REMOVE_CONF:
    default:
      return state;
  }
}

export function conferences(state = {}, action) {
  let keys, values;

  switch (action.type) {
    case types.RECEIVE_CONF:
      return assign({}, state, conference(void 0, action));
    case types.UPDATE_CONF:
      return assign({}, state, conference(state[action.confKey], action));
    case types.REMOVE_CONF:
      keys = Object.keys(state).filter(key => key !== action.confKey);
      values = keys.map(key => state[key]);
      return zipObject(keys, values);
    default:
      return state;
  }
}

export function user(state = {}) {
  return state;
}

export function view(state = {}, action) {
  let adding;

  switch (action.type) {
    case "@@router/LOCATION_CHANGE":
      if (action.payload.pathname === "/new") {
        return assign({}, state, { editing: null, adding: true });
      }
      return state;
    case types.EDITING_CONF:
      adding = !action.confKey;
      return assign({}, state, { editing: action.confKey, adding: adding });
    case types.VIEWING_CONF:
      return assign({}, state, { editing: null, adding: false });
    case types.FILTER_BY_TAG:
      return assign({}, state, {
        filters: (state.filters || []).concat([action.tagname])
      });
    case types.REMOVE_TAG_FILTER:
      return assign({}, state, {
        filters: filter((state.filters || []), f => f !== action.tagname)
      });
    case types.SHOW_FILTERS:
      return assign({}, state, { showFilters: true });
    case types.HIDE_FILTERS:
      return assign({}, state, { showFilters: false });
    default:
      return state;
  }
}
