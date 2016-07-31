import React, { Component, PropTypes } from 'react';
import {push} from 'react-router-redux';
import any from 'lodash/collection/any';
import filter from 'lodash/collection/filter';
import isEqual from 'lodash/lang/isEqual';
import { addConf, editConf, deleteConf } from '../actions/async';
import s from './conf-form.css';
import { formFilters } from '../filter-list';

import PreviewMap from "./preview-map";

class ConfForm extends Component {
  constructor(props) {
    super();
    this.state = this.initialState(props);
  }

  initialState(props) {
    const seed = (props && props.editConf) || {};
    return Object.assign(this.defaultProperties(), seed);
  }

  defaultProperties() {
    return {
      name: null,
      tags: null,
      location: null,
      website: null,
      dateFrom: null,
      dateTo: null,
      badgerSpeakers: null
    }
  }

  componentWillReceiveProps(newProps) {
    // Only update state if relevant previous props are different.
    // This is a hack, we should not need to care about this and is caused
    // by the edit and add form being the same forms, and using this hook
    // to fill the data.
    const prevProps = this.props;
    if (newProps.editConf && !isEqual(prevProps.editConf, newProps.editConf)) {
      const { name, tags, location, website, dateFrom, dateTo, badgerSpeakers } = newProps.editConf;
      this.setState({ name, tags, location, website, dateFrom, dateTo, badgerSpeakers });
    } else if (!prevProps.addConf && newProps.addConf) {
      this.setState(this.initialState());
    }
  }

  handleChange(e) {
    const key = e.target.id.match(/-(.+$)/)[1];
    this.setState({ [key]: e.target.value });
  }

  handleLocationChange(location) {
    this.setState({ location });
  }

  handleCheckboxChange(checkBoxfilter, isEnabled) {
    const tags = this.state.tags || [];

    if (isEnabled) {
      const updatedTags = filter(tags, t => t !== checkBoxfilter);
      this.setState({ tags: updatedTags.length > 0 ? updatedTags : null });
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
      this.props.dispatch(editConf(
        fbRef,
        {...this.defaultProperties(), ...this.state},
        this.props.editConfKey));
    } else {
      this.props.dispatch(addConf(
        fbRef,
        {...this.defaultProperties(), ...this.state}));
    }

    this.setState(this.initialState());
    this.props.dispatch(push('/'));
  }

  handleDelete() {
    const { fbRef, editConfKey } = this.props;
    this.props.dispatch(deleteConf(fbRef, editConfKey));
    this.props.dispatch(push('/'));
  }

  render() {
    const { name, tags, location, website, dateFrom, dateTo, badgerSpeakers } = this.state;
    const { addConf } = this.props;
    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const handleDelete = this.handleDelete.bind(this);
    const handleLocationChange = this.handleLocationChange.bind(this);

    return (
      <form className={s.form} onSubmit={handleSubmit} ref="confForm">
        {this.props.editConfKey ? <button type="button" className={s.deleteButton} onClick={handleDelete}>Delete event</button> : null}
        <legend className={s.legend}>{addConf ? "Add event" : "Edit event"}</legend>

        <div className={s.formFields}>
          <label className={s.field}>Name
            <input value={name} type="text" id="conf-name" required onChange={handleChange} />
          </label>

          <label className={s.field}>Website
            <input value={website} type="text" id="conf-website" required onChange={handleChange} />
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
                    onChange={this.handleCheckboxChange.bind(this, filter, isEnabled)} /> {filter}
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

          <label className={s.field}>Badger Speakers
            <span>(can be a comma separated list)</span>
            <textarea value={badgerSpeakers} id="conf-badgerSpeakers" onChange={handleChange} />
          </label>
        </div>

        <label className={s.fieldInline}>Location
          <PreviewMap location={location || {}} callback={handleLocationChange} />
        </label>

        <button className={s.submitButton}>Submit</button>
      </form>
    );i
  }
}

ConfForm.propTypes = {
  fbRef: PropTypes.object,
  editConf: PropTypes.object,
  editConfKey: PropTypes.string,
  dispatch: PropTypes.func,
  addConf: PropTypes.bool
}

export default ConfForm;
