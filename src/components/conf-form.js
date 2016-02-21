import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import any from 'lodash/collection/any';
import filter from 'lodash/collection/filter';
import isEqual from 'lodash/lang/isEqual';
import { addConf, editConf } from '../actions/async';
import s from './conf-form.css';
import classnames from 'classnames';
import { formFilters } from '../filter-list';

class ConfForm extends Component {
  constructor(props) {
    super();
    this.state = this.initialState(props);
  }

  initialState(props) {
    const seed = (props && props.editConf) || {};

    return Object.assign({
      name: null,
      tags: null,
      location: null,
      website: null,
      dateFrom: null,
      dateTo: null
    }, seed);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    this.props.setFormWidthCallback(node.getBoundingClientRect().width);
  }

  componentWillReceiveProps(newProps, nextState) {
    // Only update state if relevant previous props are different.
    // This is a hack, we should not need to care about this and is caused
    // by the edit and add form being the same forms, and using this hook
    // to fill the data.
    const prevProps = this.props;
    if (newProps.editConf && !isEqual(prevProps.editConf, newProps.editConf)) {
      const { name, tags, location, website, dateFrom, dateTo } = newProps.editConf;
      this.setState({ name, tags, location, website, dateFrom, dateTo });
    } else if (!prevProps.addConf && newProps.addConf) {
      this.setState(this.initialState());
    }
  }

  handleChange(e) {
    const key = e.target.id.match(/-(.+$)/)[1];
    this.setState({ [key]: e.target.value });
  }

  handleCheckboxChange(checkBoxfilter, isEnabled, e) {
    const tags = this.state.tags || [];

    if (isEnabled) {
      const updatedTags = filter(tags, t => t !== checkBoxfilter);
      this.setState({ tags: updatedTags.length > 0 ? updatedTags : undefined });
    } else {
      this.setState({ tags: tags.concat([checkBoxfilter]) });
    }
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
    const { name, tags, location, website, dateFrom, dateTo } = this.state;
    const { addConf, editConfKey, sidebarOpen, sidebarWidth } = this.props;
    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const openStyles = {
      transform: "translateX(0%)",
      width: sidebarWidth
    };

    return (
      <form className={s.form} style={sidebarOpen ? openStyles : {}} onSubmit={handleSubmit} ref="confForm">
        <legend className={s.legend}>{addConf ? "Add conf" : "Edit conf"}</legend>
        <label className={s.field}>Name
          <input value={name} type="text" id="conf-name" required onChange={handleChange} />
        </label>

        <label className={s.field}>Website
          <input value={website} type="text" id="conf-website" required onChange={handleChange} />
        </label>

        <label className={s.field}>Location
          <input value={location} type="text" id="conf-location" required onChange={handleChange} />
        </label>

        <fieldset className={s.tags}>
          <legend>Tags</legend>
          {formFilters.map((filter, index) => {
            const isEnabled = any(tags, f => f === filter);
            const id = `conf-filter-${index}`;

            return (
              <label key={filter}>
                <input
                  name={id}
                  value={isEnabled}
                  checked={isEnabled}
                  type="checkbox"
                  onClick={this.handleCheckboxChange.bind(this, filter, isEnabled)} /> {filter}
              </label>
            );
          })}
        </fieldset>

        <label className={s.field}>Date From
          <input value={dateFrom} type="date" id="conf-dateFrom" required onChange={handleChange} />
        </label>

        <label className={s.field}>Date To
          <input value={dateTo} type="date" id="conf-dateTo" required onChange={handleChange} />
        </label>

        <button className={s.button}>Submit</button>
      </form>
    );
  }
}

export default ConfForm;
