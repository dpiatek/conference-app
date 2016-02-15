import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { goToConf, interestedInConf, deleteConf, cancelInterestedInConf, cancelGoToConf } from '../actions/async';
import { editingConf } from '../actions';
import ConfButton from './conf-button';
import includes from 'lodash/collection/includes';
import values from 'lodash/object/values';
import s from './conf.css';
import widget from '../assets/widget.svg';

const calculateColor = (peopleGoing = [], peopleInterested = []) => {
  const count = peopleGoing.concat(peopleInterested).length;
  return `rgba(255,255,255,1)`;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const formatDate = (dateString) => {
  return moment(dateString).format("MMMM Do");
};

const formatDuration = (from, to) => {
  if (from === to) {
    return <span>{from}</span>;
  } else {
    return [
      <span key="from">{from}</span>,
      " to ",
      <span key="to">{to}</span>
    ];
  }
};

export class Conf extends Component {
  handleAttend() {
    const { username, confKey, fbRef, dispatch } = this.props;
    dispatch(goToConf(fbRef, username, confKey));
  }

  handleInterest() {
    const { username, confKey, fbRef, dispatch } = this.props;
    dispatch(interestedInConf(fbRef, username, confKey));
  }

  handleDelete() {
    const { fbRef, confKey, dispatch } = this.props;
    const confirm = window.confirm("Are you sure you want to remove this event");
    confirm && dispatch(deleteConf(fbRef, confKey));
  }

  handleCancelInterest() {
    const { username, confKey, fbRef, dispatch } = this.props;
    dispatch(cancelInterestedInConf(fbRef, username, confKey));
  }

  handleCancelAttendence() {
    const { username, confKey, fbRef, dispatch } = this.props;
    dispatch(cancelGoToConf(fbRef, username, confKey));
  }

  handleEdit() {
    const { confKey, dispatch } = this.props;
    dispatch(editingConf(confKey));
  }

  renderAttendance(attending) {
    return (
      <ConfButton
        addCallback={this.handleAttend.bind(this)}
        removeCallback={this.handleCancelAttendence.bind(this)}
        flag={attending}
        btnText={attending ? "Not going" : "I'm going!"} />
    );
  }

  renderInterest(attending, interested) {
    return (
      <ConfButton
        addCallback={this.handleInterest.bind(this)}
        removeCallback={this.handleCancelInterest.bind(this)}
        flag={interested}
        disabled={attending}
        btnText={interested ? "Not interested" : "I'm interested!"} />
    );
  }

  renderPeopleList(label, people) {
    if (people && people.length > 0) {
      return (
        <div className={s.peopleList}>
          <span className={s.peopleListLabel}>{label}:</span>
          <ul>
            {values(people).map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  renderTagList(tags) {
    if (tags && tags.length > 0) {
      return (
        <div className={s.tagList}>
          <ul>
            {values(tags).map(t => <li className={s.tag} key={t}>{t}</li>)}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const {
      name, website, dateFrom, tags,
      dateTo, peopleGoing, peopleInterested
    } = this.props.conf;

    const { attending, interested } = this.props;

    const inlineStyles = { backgroundColor: calculateColor(peopleGoing, peopleInterested) };
    const handleDelete = this.handleDelete.bind(this);
    const handleEdit = this.handleEdit.bind(this);

    return (
      <li className={s.container} style={inlineStyles}>
        <button className={s.openEdit} onClick={handleEdit}>
          <img src={widget} alt="open edit menu" />
        </button>

        <a className={s.name} href={website}>
          {name}
        </a>

        <div className={s.date}>
          {formatDuration(formatDate(dateFrom), formatDate(dateTo))}
        </div>

        {this.renderPeopleList("Going", peopleGoing)}
        {this.renderPeopleList("Maybe", peopleInterested)}
        {this.renderTagList(tags)}

        <div className={s.buttons}>
          {this.renderAttendance(attending)}
          {this.renderInterest(attending, interested)}
        </div>
      </li>
    );
  }
}

export function confSelector(state, props, dispatch) {
  const username = state.user.name;
  const { conf, confKey, fbRef } = props;
  const attending = includes(props.conf.peopleGoing, username);
  const interested = includes(props.conf.peopleInterested, username);
  return { username, attending, interested, conf, dispatch, confKey, fbRef };
}

export default connect(confSelector)(Conf);
