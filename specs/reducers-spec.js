import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {conference, conferences} from '../src/reducers';

describe('reducers', function () {
  it('new conference', function () {
    const action = {
      type: "ADD_CONF",
      id: 0,
      name: "JSConfBP",
      topic: "Javascript",
      website: "http://jsconfbp.com/",
      dateFrom: 1463007600000,
      dateTo: 1463094000000
    };

    deepFreeze(action);

    expect(conference(void 0, action))
      .toEqual({
        id: 0,
        name: "JSConfBP",
        topic: "Javascript",
        website: "http://jsconfbp.com/",
        dateFrom: 1463007600000,
        dateTo: 1463094000000,
        peopleGoing: [],
        peopleInterested: []
      })
  });
});

describe('conferences', function () {
  it('add a new conference', function () {
    const action = { type: "ADD_CONF", id: 0 };
    deepFreeze(action);
    expect(conferences(void 0, action).length).toEqual(1);
  });

  it('remove a conference', function () {
    const action = { type: "DELETE_CONF", id: 0 };
    const state = [{ id: 0 }];
    deepFreeze(action);
    expect(conferences(state, action).length).toEqual(0);
  });

  it('edit a conference', function () {
    const action = { type: "EDIT_CONF", id: 0, name: "B" };
    const state = [{ id: 0, name: "A" }];
    deepFreeze(state);
    expect(conferences(state, action)[0].name).toEqual("B");
  });
});
