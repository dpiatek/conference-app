import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { conference, conferences } from '../src/reducers';
import {
  RECEIVE_CONF,
  UPDATE_CONF,
  REMOVE_CONF
} from '../src/actions/types';

describe('conference reducer', function () {
  it('new conference', function () {
    const action = {
      type: RECEIVE_CONF,
      confKey: "key",
      conf: {
        id: 0,
        name: "JSConfBP",
        tags: ["Javascript"],
        website: "http://jsconfbp.com/",
        location: "London",
        dateFrom: 1463007600000,
        dateTo: 1463094000000
      }
    };

    expect(conference(void 0, action))
      .toEqual({ "key": {
        id: 0,
        name: "JSConfBP",
        tags: ["Javascript"],
        website: "http://jsconfbp.com/",
        location: "London",
        dateFrom: 1463007600000,
        dateTo: 1463094000000
      }});
  });

  it('edit a conference', function () {
    const state = { name: "A" };
    const action = {
      type: UPDATE_CONF,
      confKey: "key",
      conf: { name: "B" }
    };

    deepFreeze(state);

    expect(conference(state, action))
      .toEqual({ "key": { name: "B" }});
  });
});

describe('conferences reducer', function () {
  it('add a new conference', function () {
    const action = { type: RECEIVE_CONF, conf: { name: "A" }, confKey: "key" };
    deepFreeze(action);
    expect(conferences(void 0, action)).toEqual({ "key": { name: "A" }});
  });

  it('remove a conference', function () {
    const action = { type: REMOVE_CONF, confKey: "key" };
    const state = { "key": { name: "A" } };
    deepFreeze(action);
    expect(conferences(state, action)).toEqual({});
  });

  it('edit a conference', function () {
    const action = { type: UPDATE_CONF, conf: { name: "B" }, confKey: "key" };
    const state = { "key": { name: "A" } };
    deepFreeze(state);
    expect(conferences(state, action).key.name).toEqual("B");
  });
});
