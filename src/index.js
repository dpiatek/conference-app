import { conferences, user } from './reducers';
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
        combineReducers({ conferences, user }),
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
    .catch(errorObject => {
      console.error("The read failed: ", errorObject);
      let error;

      if (errorObject.code === "PERMISSION_DENIED") {
        error = "You don't have permisson to access this app.";
      } else {
        error = "Oops - something went wrong. The app is unavailable.";
      }

      renderLogin(error);
    });
}

function renderLogin(error) {
  render(
    <div>
      <h1>Events App</h1>
      <LoginForm fbRef={ref} error={error} />
    </div>,
    appRoot);
}

ref.onAuth(auth => auth ? renderApp() : renderLogin());
