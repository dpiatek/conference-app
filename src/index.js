import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import React from 'react';
import thunk from 'redux-thunk';
import Firebase from 'firebase';

import { conferences, user, view } from './reducers';
import App from './components/app';
import Form from './components/form';
import LoginForm from './components/login-form';

import s from './index.css';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

const apiUrl = process.env.FIREBASE_URL;
const ref = new Firebase(apiUrl);
const appRoot = document.getElementById('app');

function renderApp(auth) {
  const isAnonymous = auth.provider === "anonymous";

  ref
    .child(isAnonymous ? 'conferences_public' : 'conferences')
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();

      const userData = auth.provider === "google" ? {
        name: auth.google.displayName,
        profileImage: auth.google.profileImageURL
      } : { name: "Guest", isAnonymous: true };

      let store = createStoreWithMiddleware(
        combineReducers({ conferences, user, view, routing: routerReducer }),
        { conferences: data, user: userData }
      );

      const history = syncHistoryWithStore(browserHistory, store);
      const wrappedApp = () => <App fbRef={ref} isAnonymous={isAnonymous} />
      const wrappedForm = () => <Form fbRef={ref} />

      render(
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={wrappedApp} />
            <Route path="new" component={wrappedForm} />
            <Route path="edit" component={wrappedForm} />
          </Router>
        </Provider>,
        appRoot
      )
    })
    .catch(err => {
      renderLogin();
    })
}

function renderLogin() {
  render(
    <div className={s.login}>
      <h1>Badger Conferences</h1>
      <LoginForm fbRef={ref} />
    </div>,
    appRoot);
}

ref.onAuth(auth => auth ? renderApp(auth) : renderLogin());
