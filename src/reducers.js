export function conference(state, action) {
  switch (action.type) {
    case "ADD_CONF":
      return {
        id: action.id,
        name: action.name,
        topic: action.topic,
        website: action.website,
        dateFrom: action.dateFrom,
        dateTo: action.dateTo,
        peopleGoing: [],
        peopleInterested: []
      }
    default:
      return state;
  }
}

export function conferences(state = [], action) {
  switch (action.type) {
    case "ADD_CONF":
      return [
        ...state,
        conference(void 0, action)
      ]
    default:
      return state;
  }
}
