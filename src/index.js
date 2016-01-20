import { conferences, user } from './reducers';
import { createStore as _createStore, combineReducers, applyMiddleware } from 'redux';
import DevTools from './dev-tools';
import App from './components/app';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import Firebase from 'firebase';

const ref = new Firebase("https://blistering-fire-6946.firebaseio.com/");
const createStore = DevTools.instrument()(_createStore);

ref.once("value", function(snapshot) {
  let data = snapshot.val();

  // console.log("init", data);

  let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  let store = createStoreWithMiddleware(combineReducers({
    conferences,
    user
  }), data);

  if (process.env.NODE_ENV === 'production') {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('app')
    )
  } else {
    render(
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>,
      document.getElementById('app')
    )
  }
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
