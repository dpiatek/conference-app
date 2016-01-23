import { conferences, user } from './reducers';
import { createStore as _createStore, combineReducers } from 'redux';
import DevTools from './dev-tools';
import App from './components/app';
import LoginForm from './components/login-form';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React from 'react';
import Firebase from 'firebase';

const ref = new Firebase("https://blistering-fire-6946.firebaseio.com/");
const createStore = DevTools.instrument()(_createStore);
const auth = ref.getAuth();
const appRoot = document.getElementById('app');

if (!auth) {
  render(<LoginForm fbRef={ref} />, appRoot);
} else {
  let store = createStore(combineReducers({conferences, user }), {
    conferences: [
      {
        id: 0,
        name: "BestConf",
        topic: "Javascript",
        website: "http://best.conf",
        dateFrom: 1463007600000,
        dateTo: 1463094000000,
        peopleGoing: ["Kate", "Dominik"],
        peopleInterested: ["John", "Mary"]
      },
      {
        id: 1,
        name: "AlterConf",
        topic: "Javascript",
        website: "http://best.conf",
        dateFrom: 1463007600000,
        dateTo: 1463094000000,
        peopleGoing: ["Kate", "Dominik"],
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
}
