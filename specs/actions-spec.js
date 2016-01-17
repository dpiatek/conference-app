import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { goToConf, interestedInConf } from '../src/actions';

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
  });

  describe('interested in conference', function () {
    it('adds the user to people interested', function () {
      const result = interestedInConf(conf({}), "Bob");
      expect(result.conf).toEqual({
        id: 0,
        peopleInterested: ["Bob"]
      });
    });
  });
});
