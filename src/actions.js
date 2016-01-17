export const ADD_CONF = "ADD_CONF";
export const EDIT_CONF = "EDIT_CONF";
export const DELETE_CONF = "DELETE_CONF";
export const GO_TO_CONF = "GO_TO_CONF";
export const DONT_GO_CONF = "DONT_GO_CONF";
export const INTERESTED_IN_CONF = "INTERESTED_IN_CONF";
export const NOT_INTERESTED_IN_CONF = "NOT_INTERESTED_IN_CONF";

export function addConf(data) {
  const { name, dateFrom } = data;

  return {
    type: ADD_CONF,
    conf: {
      id: name + Date.now() + dateFrom,
      ...data
    }
  }
}

export function editConf(conf, group, username) {
  return {
    type: EDIT_CONF,
    conf: {
      id: conf.id,
      [group]: conf[group].concat([username])
    }
  }
}

export function goToConf(confId) {
  return {
    type: GO_TO_CONF,
    confId: confId
  };
}

export function interestedInConf(confId) {
  return {
    type: INTERESTED_IN_CONF,
    confId: confId
  };
}

