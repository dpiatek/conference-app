import expect from 'expect';
import User from '../src/components/user';
import UserConfList from '../src/components/user-conf-list';
import Conf from '../src/components/conf';
import ConfList from '../src/components/conf-list';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

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
