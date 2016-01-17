import React, { Component } from 'react';
import { goToConf, interestedInConf, editConf } from '../actions';

class Conf extends Component {
  handleAttend() {
    const { conf } = this.props;
    [
      goToConf(conf.id),
      editConf(conf.id, {
        peopleGoing: conf.peopleGoing.concat(["Dominik"]),
        peopleInterested: conf.peopleInterested.filter(person => person !== "Dominik")
      })
    ].forEach(action => this.props.dispatch(action));
  }

  handleInterest() {
    const { conf } = this.props;
    [
      interestedInConf(conf.id),
      editConf(conf.id, { "peopleInterested": conf.peopleInterested.concat(["Dominik"]) })
    ].forEach(action => this.props.dispatch(action));
  }

  renderAttendance(attending) {
    const handleAttend = this.handleAttend.bind(this);

    if (attending) {
      return <span>You are attending this event</span>;
    } else {
      return (
        <button
          type="button"
          disabled={attending}
          onClick={handleAttend}>I'm going!</button>
      );
    }
  }

  renderInterest(interested) {
    const handleInterest = this.handleInterest.bind(this);

    if (interested) {
      return <span>You are interested in this event</span>;
    } else {
      return (
        <button
          type="button"
          disabled={interested}
          onClick={handleInterest}>This looks interesting!</button>
      );
    }
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
          {peopleGoing.map(p => <li key={p}>{p}</li>)}
        </ul>

        <div>People interested in going:</div>
        <ul>
          {peopleInterested.map(p => <li key={p}>{p}</li>)}
        </ul>
      </li>
    );
  }
}

export default Conf;
