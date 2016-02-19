import { conferences, user, view } from './reducers';
import { createStore as _createStore, combineReducers, applyMiddleware } from 'redux';
import DevTools from './dev-tools';
import App from './components/app';
import LoginForm from './components/login-form';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import Firebase from 'firebase';
import Fireproof from 'fireproof';
import s from './index.css';

const createStore = DevTools.instrument()(_createStore);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const apiUrl = "https://blistering-fire-6946.firebaseio.com/";
const ref = new Fireproof(new Firebase(apiUrl));
const auth = ref.getAuth();

const appRoot = document.getElementById('app');

function renderApp() {
  ref
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      const auth = ref.getAuth();

      const userData = auth.provider === "google" ? {
        name:  auth.google.displayName,
        profileImage: auth.google.profileImageURL
      } : data.users[auth.uid];

      let store = createStoreWithMiddleware(
        combineReducers({ conferences, user, view }),
        { conferences: data.conferences, user: userData }
      );

      if (process.env.NODE_ENV === 'production') {
        render(
          <Provider store={store}>
            <App fbRef={ref} />
          </Provider>,
          appRoot
        )
      } else {
        render(
          <Provider store={store}>
            <div>
              <App fbRef={ref} />
              <DevTools />
            </div>
          </Provider>,
          appRoot
        )
      }
    })
    .catch(() => renderLogin());
}

function renderLogin() {
  render(
    <div className={s.login}>
      <h1>Events App</h1>
      <LoginForm fbRef={ref} />
    </div>,
    appRoot);
}

ref.onAuth(auth => auth ? renderApp() : renderLogin());
