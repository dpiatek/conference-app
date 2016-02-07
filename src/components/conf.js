import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goToConf, interestedInConf, deleteConf } from '../actions/async';
import { editingConf } from '../actions';
import ConfButton from './conf-button';
import includes from 'lodash/collection/includes';
import values from 'lodash/object/values';
import s from './conf.css';

const randomColor = () => {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  const opacity = Math.random() / 1.2;
  return `rgba(${r},${g},${b},${opacity})`;
}

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

  handleEdit() {
    const { confKey, dispatch } = this.props;
    dispatch(editingConf(confKey));
  }

  renderAttendance(attending) {
    return (
      <ConfButton
        callback={this.handleAttend.bind(this)}
        flag={attending}
        notAvailableText={"You are attending this event"}
        btnText={"I'm going!"} />
    );
  }

  renderInterest(interested) {
    return (
      <ConfButton
        callback={this.handleInterest.bind(this)}
        flag={interested}
        notAvailableText={"You are interested in this event"}
        btnText={"This looks interesting!"} />
    );
  }

  render() {
    const {
      name, website, topic, dateFrom,
      dateTo, peopleGoing, peopleInterested
    } = this.props.conf;

    const { attending, interested } = this.props;

    const inlineStyles = { backgroundColor: randomColor() };
    const handleDelete = this.handleDelete.bind(this);
    const handleEdit = this.handleEdit.bind(this);

    return (
      <li className={s.confItem} style={inlineStyles}>
        <div>
          <a href={website}>{name}</a>
        </div>
        <div>Topic: {topic}</div>
        <div>From: {dateFrom}</div>
        <div>To: {dateTo}</div>

        <div>
          {this.renderAttendance(attending)}
          {!attending && this.renderInterest(interested)}
        </div>

        <div>People going:</div>
        <ul>
          {values(peopleGoing).map(p => <li key={p}>{p}</li>)}
        </ul>

        <div>People interested in going:</div>
        <ul>
          {values(peopleInterested).map(p => <li key={p}>{p}</li>)}
        </ul>

        <button onClick={handleDelete}>Delete Event</button>
        <button onClick={handleEdit}>Edit Event</button>
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
