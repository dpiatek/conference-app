import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {
  goToConf,
  interestedInConf,
  cancelGoToConf,
  cancelInterestedInConf
} from '../src/actions';

describe('actions', function () {
  const conf = ({ peopleGoing = [], peopleInterested = [] }) => {
    return {
      id: 0,
      peopleGoing: peopleGoing,
      peopleInterested: peopleInterested
    }
  };

  describe('go to conference', function () {
    it('adds the user to people going', function () {
      const result = goToConf(conf({}), "Bob");
      expect(result.conf).toEqual({
        id: 0,
        peopleGoing: ["Bob"],
        peopleInterested: []
      });
    });

    it('removes the user from people interested', function () {
      const result = goToConf(
        conf({ peopleInterested: ["Bob"] }),
        "Bob"
      );
      expect(result.conf).toEqual({
        id: 0,
        peopleGoing: ["Bob"],
        peopleInterested: []
      });
    });

    it('removes the user from people going', function () {
      const result = cancelGoToConf(conf({ peopleGoing: ["Bob"] }), "Bob");
      expect(result.conf).toEqual({
        id: 0,
        peopleGoing: []
      });
    });
  });

  describe('interested in conference', function () {
    it('adds the user to people interested', function () {
      const result = interestedInConf(conf({}), "Bob");
      expect(result.conf).toEqual({
        id: 0,
        peopleInterested: ["Bob"]
      });
    });

    it('removes the user from people interested', function () {
      const result = cancelInterestedInConf(
        conf({ peopleInterested: ["Bob"] }),
        "Bob"
      );
      expect(result.conf).toEqual({
        id: 0,
        peopleInterested: []
      });
    });
  });
});
