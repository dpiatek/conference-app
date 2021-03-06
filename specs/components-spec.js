import expect from 'expect';
import { UserConfList, userConfListSelector } from '../src/components/user-conf-list';
import { Conf, confSelector } from '../src/components/conf';
import ConfForm from '../src/components/conf-form';
import ReactDOMServer from 'react-dom/server';
import { findDOMNode as findNode } from 'react-dom';
import React from 'react';
import TestUtils, { renderIntoDocument, scryRenderedDOMComponentsWithTag as scryTag } from 'react-addons-test-utils';

describe('UserConfList', function() {
  it('renders correctly', function() {
    const string = ReactDOMServer.renderToString(
      <UserConfList confKeys={["key"]} conferences={{"key": { name: "BestConf" }}} />
    );
    expect(string).toInclude("BestConf");
  });

  it('transforms props correctly', function () {
    const dispatch = function(){};
    const state = {
      conferences: { "key": { name: "BestConf", peopleGoing: ["Jake"] }},
      user: { name: "Jake" }
    };
    const props = { group: "peopleGoing", fbRef: {} };
    const result = userConfListSelector(state, props, dispatch);
    expect(result).toEqual({
      dispatch, name: state.user.name,
      conferences: state.conferences,
      confKeys: ["key"],
      fbRef: {}
    });
  });
});

describe('Conf', function() {
  let conf = Object.freeze({
    id: 0,
    name: "BestConf",
    tags: ["Javascript"],
    website: "http://best.conf",
    location: "London",
    dateFrom: "2015-05-12",
    dateTo: "2015-05-13",
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
      .toInclude("May 12th")
      .toInclude("13th")
      .toInclude("Jake");
  });

  it('renders correctly attendance', function() {
    const string = ReactDOMServer.renderToString(
      <Conf conf={conf} attending={true} />
    );
    expect(string).toInclude("Going");
    expect(string).toInclude("Jake");
  });

  it('renders correctly interest', function() {
    conf = Object.freeze({
      id: 0,
      name: "BestConf",
      tags: ["Javascript"],
      website: "http://best.conf",
      location: "London",
      dateFrom: 1463007600000,
      dateTo: 1463094000000,
      peopleGoing: [],
      peopleInterested: ["Jake"]
    });

    const string = ReactDOMServer.renderToString(
      <Conf conf={conf} interested={true} />
    );
    expect(string).toInclude("Maybe");
    expect(string).toInclude("Jake");
  });

  it('transforms props correctly', function () {
    const dispatch = function(){};
    const state = {
      user: { name: "Jake", isAnonymous: false },
      view: {}
    };
    const props = {
      conf: {
        peopleGoing: [],
        peopleInterested: [state.user.name]
      },
      confKey: "key",
      fbRef: {}
    };
    const result = confSelector(state, props, dispatch);
    expect(result).toEqual({
      dispatch,
      username: state.user.name,
      conf: props.conf,
      attending: false,
      interested: true,
      confKey: "key",
      fbRef: {},
      isAnonymous: false
    });
  });
});

describe('ConfForm', function () {
  before(() => {
    global.google = {
      maps: {
        Map: function() {
          this.addListener = () => {};
        },
        places: {
          SearchBox: function() {
            this.addListener = () => {};
          }
        }
      }
    }
  });

  it('handles changes on a field', function () {
    const props = { setFormWidthCallback: function(){} };
    const instance = renderIntoDocument(<ConfForm { ...props } />);
    const input = scryTag(instance, 'input')[0];
    const node = findNode(input);
    node.value = "Alice";
    TestUtils.Simulate.change(node);
    expect(instance.state.name).toEqual("Alice");
  });

  it('does not submit an invalid conf', function () {
    const spy = expect.createSpy();
    const props = { setFormWidthCallback: function(){}, dispatch: spy };
    const instance = renderIntoDocument(<ConfForm { ...props } />);
    const form = findNode(instance);
    TestUtils.Simulate.submit(form);
    expect(spy).toNotHaveBeenCalled();
  });

  it('submits a valid form', function () {
    const spy = expect.createSpy();
    const props = { setFormWidthCallback: function(){}, dispatch: spy };
    const instance = renderIntoDocument(<ConfForm { ...props } />);

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

  after(() => {
    global.google = null;
  });
});
