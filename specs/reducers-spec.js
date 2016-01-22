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
      confKey: "key",
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
      .toEqual({ "key": {
        id: 0,
        name: "JSConfBP",
        topic: "Javascript",
        website: "http://jsconfbp.com/",
        dateFrom: 1463007600000,
        dateTo: 1463094000000
      }});
  });

  it('edit a conference', function () {
    const state = { name: "A" };
    const action = {
      type: EDIT_CONF,
      confKey: "key",
      conf: { name: "B" }
    };

    deepFreeze(state);

    expect(conference(state, action))
      .toEqual({ "key": {
        name: "B",
        topic: undefined,
        website: undefined,
        dateFrom: undefined,
        dateTo: undefined,
        peopleGoing: undefined,
        peopleInterested: undefined
      }});
  });
});

describe('conferences reducer', function () {
  it('add a new conference', function () {
    const action = { type: ADD_CONF, conf: { name: "A" }, confKey: "key" };
    deepFreeze(action);
    expect(conferences(void 0, action)).toEqual({ "key": { name: "A" }});
  });

  it('remove a conference', function () {
    const action = { type: DELETE_CONF, confKey: "key" };
    const state = { "key": { name: "A" } };
    deepFreeze(action);
    expect(conferences(state, action)).toEqual({});
  });

  it('edit a conference', function () {
    const action = { type: EDIT_CONF, conf: { name: "B" }, confKey: "key" };
    const state = { "key": { name: "A" } };
    deepFreeze(state);
    expect(conferences(state, action).key.name).toEqual("B");
  });
});
