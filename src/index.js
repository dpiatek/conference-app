import { conferences, user } from './reducers';
import { createStore, combineReducers } from 'redux';
import App from './components/app';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React from 'react';

let store = createStore(combineReducers({
  conferences,
  user
}), {
  conferences: [
    {
      id: 0,
      name: "BestConf",
      topic: "Javascript",
      website: "http://best.conf",
      dateFrom: 1463007600000,
      dateTo: 1463094000000
    }
  ],
  user: {
    name: "Dominik",
    goingToConfs: [],
    interestedInConfs: []
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

window.store = store;