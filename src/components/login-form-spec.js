import expect from 'expect';
import LoginForm from './login-form';
import ReactDOMServer from 'react-dom/server';
import ReactDOM, { findDOMNode as findNode } from 'react-dom';
import React from 'react';
import TestUtils, { renderIntoDocument, scryRenderedDOMComponentsWithTag as scryTag } from 'react-addons-test-utils';

const fillInField = (instance, field, value) => {
  const tag = scryTag(instance, 'input')[field === "email" ? 0 : 1];
  const node = findNode(tag);
  node.value = value;
  return node;
}

const createSpyAndInstance = () => {
  const spy = expect.createSpy();
  const ref = { authWithPassword: spy };
  const instance = renderIntoDocument(<LoginForm fbRef={ref} />);
  return { spy, instance };
}

describe('LoginForm', function() {
  it('renders correctly', function() {
    const string = ReactDOMServer.renderToString(
      <LoginForm />
    );

    expect(string)
      .toInclude("Email")
      .toInclude("Password");
  });

  it('handles changes on a field', function () {
    const instance = renderIntoDocument(<LoginForm />);
    TestUtils.Simulate.change(fillInField(instance, "email", "do.piatek@gmail.com"));
    expect(instance.state.email).toEqual("do.piatek@gmail.com");
  });

  it('does not submit if email is missing', function () {
    const {spy , instance} = createSpyAndInstance();
    TestUtils.Simulate.change(fillInField(instance, "password", "12345"));
    TestUtils.Simulate.submit(findNode(instance));
    expect(spy).toNotHaveBeenCalled();
  });

  it('does not submit if password is missing', function () {
    const {spy , instance} = createSpyAndInstance();
    TestUtils.Simulate.change(fillInField(instance, "email", "bob123@g.com"));
    TestUtils.Simulate.submit(findNode(instance));
    expect(spy).toNotHaveBeenCalled();
  });

  it('submits the form', function () {
    const {spy , instance} = createSpyAndInstance();
    TestUtils.Simulate.change(fillInField(instance, "email", "bob123@g.com"));
    TestUtils.Simulate.change(fillInField(instance, "password", "12345"));
    TestUtils.Simulate.submit(findNode(instance));
    expect(spy).toHaveBeenCalled();
  });
});