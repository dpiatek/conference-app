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
  it('renders correctly', function() {
    const conf = {
      id: 0,
      name: "BestConf",
      topic: "Javascript",
      website: "http://best.conf",
      dateFrom: 1463007600000,
      dateTo: 1463094000000,
    };
    const string = ReactDOMServer.renderToString(
      <Conf conf={conf} />
    );
    expect(string)
      .toInclude("BestConf")
      .toInclude("Javascript")
      .toInclude("http://best.conf")
      .toInclude("1463007600000")
      .toInclude("1463094000000");
  });
});

describe('ConfList', function() {
  it('renders correctly', function() {
    const confsData = [
      { id: 0, name: "BestConf" },
      { id: 1, name: "EvenBetterConf" }
    ];
    const string = ReactDOMServer.renderToString(
      <ConfList confsData={confsData} />
    );
    expect(string)
      .toInclude("BestConf")
      .toInclude("EvenBetterConf");
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
