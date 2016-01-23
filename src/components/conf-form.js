import React, { Component } from 'react';
import { addConf } from '../actions';
import s from './conf-form.css';

class ConfForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      topic: "",
      website: "",
      dateFrom: "",
      dateTo: ""
    }
  }

  handleChange(e) {
    const key = e.target.id.match(/-(.+$)/)[1];
    this.setState({ [key]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, website } = this.state;

    if (!name || !website) {
      return;
    }

    this.props.dispatch(addConf(this.state));
  }

  render() {
    const { name, topic, website, dateFrom, dateTo } = this.state;
    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <form onSubmit={handleSubmit} ref="confForm">
        <legend className={s.legend}>Add conf</legend>
        <label className={s.field}>Name*
          <input value={name} type="text" id="conf-name" required onChange={handleChange} />
        </label>

        <label className={s.field}>Website*
          <input value={website} type="text" id="conf-website" required onChange={handleChange} />
        </label>

        <label className={s.field}>Topic
          <input value={topic} type="text" id="conf-topic" onChange={handleChange} />
        </label>

        <label className={s.field}>Date From
          <input value={dateFrom} type="date" id="conf-dateFrom" onChange={handleChange} />
        </label>

        <label className={s.field}>Date To
          <input value={dateTo} type="date" id="conf-dateTo" onChange={handleChange} />
        </label>

        <button>Submit</button>
      </form>
    );
  }
}

export default ConfForm;