import React from 'react';
import User from './user';
import ConfList from './conf-list';
import { connect } from 'react-redux';

const App = ({ user, conferences }) => {
  return (
    <div>
      <User userData={user} confsData={conferences} />
      <ConfList confsData={conferences} />

      <div>
        <div>Add/Edit conf</div>
        <form>
          <label>
            Name
            <input type="text" id="conf-name" />
          </label>

          <label>
            Topic
            <input type="text" id="conf-date-to" />
          </label>

          <label>
            Website
            <input type="text" id="conf-link" />
          </label>

          <label>
            Date From
            <input type="date" id="conf-date-from" />
          </label>

          <label>
            Date To
            <input type="date" id="conf-date-to" />
          </label>
        </form>
      </div>
    </div>
  );
}

export default connect(state => state)(App);

