import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {
  addConf,
  goToConf,
  interestedInConf,
  cancelGoToConf,
  cancelInterestedInConf
} from '../src/actions/async';

const setup = (conf) => {
  deepFreeze(conf);
  const ref = {
    child: () => ref,
    transaction: (fn) => ref.result = fn(conf)
  };
  const spy = expect.spyOn(ref, "child").andCallThrough();

  return { ref, spy };
}

const username = "Bob";

describe('Actions', function () {
  describe('add a conference', function () {
    it('adds a conference', function () {
      const conference = { name: "Conf" };
      const ref = {
        child: () => ref,
        push: expect.createSpy()
      };
      addConf(ref, conference)();
      expect(ref.push).toHaveBeenCalledWith(conference);
    });
  });

  describe('go to conference', function () {
    it('adds the user to people going', function() {
      const { ref, spy } = setup({});
      goToConf(ref, username, "key")();
      expect(spy).toHaveBeenCalledWith("key");
      expect(ref.result).toEqual({ peopleGoing: [username], peopleInterested: [] });
    });

    it('removes the user from people interested', function() {
      const { ref, spy } = setup({ peopleGoing: null, peopleInterested: [username] });
      goToConf(ref, username, "key")();
      expect(spy).toHaveBeenCalledWith("key");
      expect(ref.result).toEqual({ peopleGoing: [username], peopleInterested: [] });
    });

    it('removes the user from people going', function() {
      const { ref, spy } = setup({ peopleGoing: [username] });
      cancelGoToConf(ref, username, "key")();
      expect(spy).toHaveBeenCalledWith("key");
      expect(ref.result).toEqual({ peopleGoing: [] });
    });
  });

  describe('interested in conference', function () {
    it('adds the user to people interested', function() {
      const { ref, spy } = setup({ peopleInterested: [] });
      interestedInConf(ref, username, "key")();
      expect(spy).toHaveBeenCalledWith("key");
      expect(ref.result).toEqual({ peopleInterested: [username] });
    });

    it('removes the user from people interested', function() {
      const { ref, spy } = setup({ peopleInterested: [username] });
      cancelInterestedInConf(ref, username, "key")();
      expect(spy).toHaveBeenCalledWith("key");
      expect(ref.result).toEqual({ peopleInterested: [] });
    });
  });
});
