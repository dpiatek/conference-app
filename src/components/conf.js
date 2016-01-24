import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goToConf, interestedInConf, editConf } from '../actions';
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
  componentDidMount() {
    const { confKey, fbRef, dispatch } = this.props;
    fbRef.child('conferences').child(confKey).on('value', snapshot => {
      dispatch(editConf(snapshot.val(), confKey));
    });
  }

  componentWillUnmount() {
    fbRef.off('value');
  }

  handleAttend() {
    const { username, confKey, fbRef, dispatch } = this.props;
    dispatch(goToConf(fbRef, username, confKey));
  }

  handleInterest() {
    const { username, confKey, fbRef, dispatch } = this.props;
    dispatch(interestedInConf(fbRef, username, confKey));
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
