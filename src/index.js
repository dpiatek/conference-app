import { conferences, user } from './reducers';
import { createStore as _createStore, combineReducers } from 'redux';
import DevTools from './dev-tools';
import App from './components/app';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React from 'react';

const createStore = DevTools.instrument()(_createStore);

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
      dateTo: 1463094000000,
      peopleGoing: ["Kate"],
      peopleInterested: ["John", "Mary"]
    }
  ],
  user: {
    name: "Dominik"
  }
});

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
