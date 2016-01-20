import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goToConf, interestedInConf } from '../actions';
import ConfButton from './conf-button';
import includes from 'lodash/collection/includes';
import values from 'lodash/object/values';

export class Conf extends Component {
  handleAttend() {
    const { username, confKey } = this.props;
    this.props.dispatch(goToConf(username, confKey));
  }

  handleInterest() {
    this.props.dispatch(
      interestedInConf(this.props.conf, this.props.username)
    );
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

    return (
      <li>
        <div>
          <a href={website}>{name}</a>
        </div>
        <div>{topic}</div>
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
  const { conf, confKey } = props;
  const attending = includes(props.conf.peopleGoing, username);
  const interested = includes(props.conf.peopleInterested, username);
  return { username, attending, interested, conf, dispatch, confKey };
}

export default connect(confSelector)(Conf);
