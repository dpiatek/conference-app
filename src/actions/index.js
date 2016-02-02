export const RECEIVE_CONF = "RECEIVE_CONF";
export const UPDATE_CONF = "UPDATE_CONF";
export const REMOVE_CONF = "REMOVE_CONF";
export const EDITING_CONF = "EDITING_CONF";
export const VIEWING_CONF = "VIEWING_CONF";

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
