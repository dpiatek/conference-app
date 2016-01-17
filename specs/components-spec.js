import expect from 'expect';
import User from '../src/components/user';
import UserConfList from '../src/components/user-conf-list';
import Conf from '../src/components/conf';
import ConfList from '../src/components/conf-list';
import ConfForm from '../src/components/conf-form';
import ReactDOMServer from 'react-dom/server';
import ReactDOM, { findDOMNode as findNode } from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import TestUtils, { renderIntoDocument, scryRenderedDOMComponentsWithTag as scryTag } from 'react-addons-test-utils';
import { GO_TO_CONF, INTERESTED_IN_CONF } from '../src/actions';

describe('User', function() {
  it('renders correctly', function() {
    const user = { name: "Bob" };
    const confsData = [{ id: 0, name: "BestConf" }];
    const string = ReactDOMServer.renderToString(
      <User userData={user} confsData={confsData} />);
    expect(string).toInclude("Bob");
  });
});

describe('UserConfList', function() {
  it('renders correctly', function() {
    const confs = [0];
    const confsData = [{ id: 0, name: "BestConf" }];
    const string = ReactDOMServer.renderToString(
      <UserConfList confs={confs} confsData={confsData} />
    );
    expect(string).toInclude("BestConf");
  });
});

describe('Conf', function() {
  const conf = Object.freeze({
    id: 0,
    name: "BestConf",
    topic: "Javascript",
    website: "http://best.conf",
    dateFrom: 1463007600000,
    dateTo: 1463094000000,
    peopleGoing: ["Jake"],
    peopleInterested: []
  });

  it('renders correctly', function() {
    const string = ReactDOMServer.renderToString(
      <Conf conf={conf} />
    );
    expect(string)
      .toInclude("BestConf")
      .toInclude("Javascript")
      .toInclude("http://best.conf")
      .toInclude("1463007600000")
      .toInclude("1463094000000")
      .toInclude("Jake");
  });

  it('renders correctly attendance', function() {
    const string = ReactDOMServer.renderToString(
      <Conf conf={conf} attending={true} />
    );
    expect(string).toInclude("You are attending this event");
    expect(string).toExclude("I&#x27;m going");
    expect(string).toExclude("This looks interesting!");
  });

  it('renders correctly interest', function() {
    const string = ReactDOMServer.renderToString(
      <Conf conf={conf} interested={true} />
    );
    expect(string).toInclude("You are interested in this event");
    expect(string).toExclude("This looks interesting!");
  });
});

describe('ConfList', function() {
  it('renders correctly', function() {
    const confsData = [
      { id: 0, name: "BestConf", peopleGoing: [], peopleInterested: [] },
      { id: 1, name: "EvenBetterConf", peopleGoing: [], peopleInterested: [] }
    ];
    const userData = {
      goingToConfs: [0],
      interestedInConfs: []
    }
    const string = ReactDOMServer.renderToString(
      <ConfList confsData={confsData} userData={userData} />
    );
    expect(string)
      .toInclude("BestConf")
      .toInclude("EvenBetterConf")
      .toInclude("You are attending this event")
      .toInclude("This looks interesting!");
  });
});

describe('ConfForm', function () {
  it('handles changes on a field', function () {
    const instance = renderIntoDocument(<ConfForm />);
    const input = scryTag(instance, 'input')[0];
    const node = findNode(input);
    node.value = "Alice";
    TestUtils.Simulate.change(node);
    expect(instance.state.name).toEqual("Alice");
  });

  it('does not submit an invalid conf', function () {
    const spy = expect.createSpy();
    const instance = renderIntoDocument(<ConfForm dispatch={spy} />);
    const form = findNode(instance);
    TestUtils.Simulate.submit(form);
    expect(spy).toNotHaveBeenCalled();
  });

  it('submits a valid form', function () {
    const spy = expect.createSpy();
    const instance = renderIntoDocument(<ConfForm dispatch={spy} />);

    const nameInput = scryTag(instance, 'input')[0];
    const nameNode = findNode(nameInput);
    nameNode.value = "Alice";
    TestUtils.Simulate.change(nameNode);

    const websiteInput = scryTag(instance, 'input')[1];
    const websiteNode = findNode(websiteInput);
    websiteNode.value = "http://best.conf";
    TestUtils.Simulate.change(websiteNode);

    const form = findNode(instance);
    TestUtils.Simulate.submit(form);
    expect(spy).toHaveBeenCalled();
  });
});
