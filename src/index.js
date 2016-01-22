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

if (!auth) {
  render(<LoginForm fbRef={ref} />, appRoot);
} else {
  ref.once("value", function(snapshot) {
    let store = createStoreWithMiddleware(
      combineReducers({conferences, user }),
      snapshot.val()
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
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}
