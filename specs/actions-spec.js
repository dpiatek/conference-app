import expect from 'expect';
import { MockFirebase } from 'mockfirebase';
import Fireproof from 'fireproof';
import deepFreeze from 'deep-freeze';
import {
  addConf,
  goToConf,
  interestedInConf,
  cancelGoToConf,
  cancelInterestedInConf
} from '../src/actions';

const setup = conf => {
  const ref = new MockFirebase("");
  const key = ref.child("conferences").push(conf).key();
  const promiseRef = new Fireproof(ref);
  const dispatch = x => x;
  return { ref, key, promiseRef, dispatch };
}

const username = "Bob";

describe('Actions', function () {
  describe('add a conference', function () {
    it('adds a conference', function (done) {
      const conference = { name: "Conf" };
      const ref = new MockFirebase();
      const promiseRef = new Fireproof(ref);
      const dispatch = x => x;
      const result = addConf(promiseRef, conference)(dispatch);
      ref.flush();
      result.then(result => {
        expect(result.conf).toEqual(conference);
        done();
      });
    });
  });

  describe('go to conference', function () {
    it('adds the user to people going', function (done) {
      const conf = { name: "Conf", peopleGoing: [] };
      const { ref, key, promiseRef, dispatch } = setup(conf);
      const result = goToConf(promiseRef, username, key)(dispatch);
      ref.flush();
      result.then(result => {
        expect(result.conf.peopleGoing).toEqual([username]);
        done();
      });
    });

    it('removes the user from people interested', function (done) {
      const conf = { name: "Conf", peopleGoing: [], peopleInterested: [username] };
      const { ref, key, promiseRef, dispatch } = setup(conf);
      const result = goToConf(promiseRef, username, key)(dispatch);
      ref.flush();
      result.then(result => {
        expect(result.conf.peopleInterested).toEqual([]);
        done();
      });
    });

    it('removes the user from people going', function (done) {
      const conf = { name: "Conf", peopleGoing: [username] };
      const { ref, key, promiseRef, dispatch } = setup(conf);
      const result = cancelGoToConf(promiseRef, username, key)(dispatch);
      ref.flush();
      result.then(result => {
        expect(result.conf.peopleGoing).toEqual([]);
        done();
      });
    });
  });

  describe('interested in conference', function () {
    it('adds the user to people interested', function (done) {
      const conf = { name: "Conf", peopleInterested: [] };
      const { ref, key, promiseRef, dispatch } = setup(conf);
      const result = interestedInConf(promiseRef, username, key)(dispatch);
      ref.flush();
      result.then(result => {
        expect(result.conf.peopleInterested).toEqual([username]);
        done();
      });
    });

    it('removes the user from people interested', function (done) {
      const conf = { name: "Conf", peopleInterested: [username] };
      const { ref, key, promiseRef, dispatch } = setup(conf);
      const result = cancelInterestedInConf(promiseRef, username, key)(dispatch);
      ref.flush();
      result.then(result => {
        expect(result.conf.peopleInterested).toEqual([]);
        done();
      });
    });
  });
});
