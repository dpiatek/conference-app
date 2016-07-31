import * as types from "./types";

export function receiveConf(conf, confKey) {
  return { type: types.RECEIVE_CONF, conf, confKey };
}

export function updateConf(conf, confKey) {
  return { type: types.UPDATE_CONF, conf, confKey };
}

export function removeConf(confKey) {
  return { type: types.REMOVE_CONF, confKey };
}

export function editingConf(confKey) {
  return { type: types.EDITING_CONF, confKey };
}

export function viewingConf() {
  return { type: types.VIEWING_CONF };
}

export function filterByTag(tag) {
  return { type: types.FILTER_BY_TAG, tagname: tag };
}

export function removeTagFilter(tag) {
  return { type: types.REMOVE_TAG_FILTER, tagname: tag };
}

export function showFilters() {
  return { type: types.SHOW_FILTERS };
}

export function hideFilters() {
  return { type: types.HIDE_FILTERS };
}
