import React, { Component } from 'react';
import { addConf, editConf } from '../actions/async';
import s from './conf-form.css';

class ConfForm extends Component {
  constructor() {
    super();
    this.state = this.initialState();
  }

  initialState() {
    return {
      name: null,
      topic: null,
      website: null,
      dateFrom: null,
      dateTo: null
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.editConf) {
      this.setState(newProps.editConf);
    }
  }

  handleChange(e) {
    const key = e.target.id.match(/-(.+$)/)[1];
    this.setState({ [key]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, website } = this.state;
    const fbRef = this.props.fbRef;

    if (!name || !website) {
      return;
    }

    if (this.props.editConf && this.props.editConfKey) {
      this.props.dispatch(editConf(fbRef, this.state, this.props.editConfKey));
    } else {
      this.props.dispatch(addConf(fbRef, this.state));
    }

    this.setState(this.initialState());
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