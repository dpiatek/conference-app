import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { conference, conferences, user } from '../src/reducers';
import {
  ADD_CONF,
  EDIT_CONF,
  DELETE_CONF,
  GO_TO_CONF,
  DONT_GO_CONF,
  INTERESTED_IN_CONF,
  NOT_INTERESTED_IN_CONF
} from '../src/actions';

describe('conference reducer', function () {
  it('new conference', function () {
    const action = {
      type: ADD_CONF,
      conf: {
        id: 0,
        name: "JSConfBP",
        topic: "Javascript",
        website: "http://jsconfbp.com/",
        dateFrom: 1463007600000,
        dateTo: 1463094000000
      }
    };

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

  it('edit a conference', function () {
    const state = { id: 0, name: "A" };
    const action = {
      type: EDIT_CONF,
      conf: {
        id: 0,
        name: "B"
      }
    };

    deepFreeze(state);

    expect(conference(state, action))
      .toEqual({ id: 0, name: "B" });
  });
});

describe('conferences reducer', function () {
  it('add a new conference', function () {
    const action = { type: ADD_CONF, conf: { id: 0 } };
    deepFreeze(action);
    expect(conferences(void 0, action).length).toEqual(1);
  });

  it('remove a conference', function () {
    const action = { type: DELETE_CONF, conf: { id: 0 } };
    const state = [{ id: 0 }];
    deepFreeze(action);
    expect(conferences(state, action).length).toEqual(0);
  });

  it('edit a conference', function () {
    const action = { type: EDIT_CONF, conf: { id: 0, name: "B" } };
    const state = [{ id: 0, name: "A" }];
    deepFreeze(state);
    expect(conferences(state, action)[0].name).toEqual("B");
  });
});
