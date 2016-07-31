import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import compact from 'lodash.compact';
import includes from 'lodash/collection/includes';
import values from 'lodash/object/values';

import { goToConf, interestedInConf, cancelInterestedInConf, cancelGoToConf } from '../actions/async';
import { editingConf } from '../actions';
import ConfButton from './conf-button';

import s from './conf.css';
import widget from '../assets/widget.svg';
import calendarIcon from '../assets/calendar-icon.svg';
import starIcon from '../assets/star.svg';
import badger from '../assets/badger-dude.svg';

const formatDate = dateString => moment(dateString).format("MMMM Do");

const formatDuration = (from, to) => {
  const sameMonth = from.split(" ")[0] === to.split(" ")[0];

  if (from === to) {
    return <span>{from}</span>;
  } else {
    return [
      <span key="from">{from}</span>,
      " to ",
      <span key="to">{sameMonth ? to.split(" ")[1] : to}</span>
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
    dispatch(push('/edit'));
  }

  renderAttendance(attending) {
    return (
      <ConfButton
        addCallback={this.handleAttend.bind(this)}
        removeCallback={this.handleCancelAttendence.bind(this)}
        flag={attending}
        btnText={"I'm going!"} />
    );
  }

  renderInterest(attending, interested) {
    return (
      <ConfButton
        addCallback={this.handleInterest.bind(this)}
        removeCallback={this.handleCancelInterest.bind(this)}
        flag={interested}
        disabled={attending}
        btnText={"I'm interested!"} />
    );
  }

  renderPeopleList(label, people) {
    if (people && people.length > 0) {
      return (
        <div className={s.peopleList} key={label}>
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

  renderTagList(label, tags) {
    if (tags && tags.length > 0) {
      return (
        <div className={s.peopleList} key="tags">
          <span className={s.peopleListLabel}>{label}:</span>
          <ul>
            {values(tags).map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  renderLocation(location) {
    const locationName = typeof location === "string" ? location : location.name;

    return (
      <div className={s.location}>{locationName}</div>
    );
  }

  getSpeakers(badgerSpeakersString) {
    return typeof badgerSpeakersString === "string" ? compact(badgerSpeakersString.split(",")) : badgerSpeakersString;
  }

  renderBadgerSpeakers(label, badgerSpeakers) {
    if (badgerSpeakers && badgerSpeakers.length > 0) {
      return (
        <div className={s.peopleList} key={label}>
          <span className={s.peopleListLabel}>{label}:</span>
          <ul>
            {values(badgerSpeakers).map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  renderPeopleGoingCount(peopleGoing) {
    if (peopleGoing) {
      return (
        <span className={s.goingCount}>
          <span dangerouslySetInnerHTML={{__html: calendarIcon}}></span>
          {peopleGoing.length}
        </span>
      );
    } else {
      return null;
    }
  }

  renderPeopleInterestedCount(peopleInterested) {
    if (peopleInterested) {
      return (
        <span className={s.interestedCount}>
          <span dangerouslySetInnerHTML={{__html: starIcon}}></span>
          {peopleInterested.length}
        </span>
      );
    } else {
      return null;
    }
  }

  renderBadgerSpeakersCount(peopleSpeaking) {
    if (peopleSpeaking) {
      return (
        <span className={s.badgerCount}>
          <span dangerouslySetInnerHTML={{__html: badger}}></span>
          {peopleSpeaking.length}
        </span>
      );
    } else {
      return null;
    }
  }

  renderDetails(peopleGoing, peopleInterested, speakers) {
    return [
      this.renderPeopleList("Going", peopleGoing),
      this.renderPeopleList("Maybe", peopleInterested),
      this.renderBadgerSpeakers("Speakers", speakers)
    ];
  }

  render() {
    const {
      name, website, dateFrom, tags, location,
      dateTo, peopleGoing, peopleInterested, badgerSpeakers
    } = this.props.conf;

    const { attending, interested, isAnonymous } = this.props;
    const speakers = this.getSpeakers(badgerSpeakers);

    const handleEdit = this.handleEdit.bind(this);

    return (
      <li className={s.container}>
        {isAnonymous ? null : <button className={s.openEdit} onClick={handleEdit}>
          <div dangerouslySetInnerHTML={{__html: widget}}></div>
        </button>}

        <a className={s.name} href={website} target="_blank">
          {name}
        </a>

        {(peopleGoing || peopleInterested || speakers) ? <div className={s.counts}>
          {this.renderPeopleGoingCount(peopleGoing)}
          {this.renderPeopleInterestedCount(peopleInterested)}
          {this.renderBadgerSpeakersCount(speakers)}
        </div> : null}

        {isAnonymous ? null : <div className={s.buttons}>
          {this.renderAttendance(attending)}
          {this.renderInterest(attending, interested)}
        </div>}

        <div className={s.date}>
          {formatDuration(formatDate(dateFrom), formatDate(dateTo))}
        </div>

        {location && this.renderLocation(location)}
        {isAnonymous ? null : this.renderDetails(peopleGoing, peopleInterested, speakers)}
        {this.renderTagList("Tags", tags)}
      </li>
    );
  }
}

Conf.propTypes = {
  username: PropTypes.string,
  confKey: PropTypes.string,
  fbRef: PropTypes.object,
  dispatch: PropTypes.func,
  conf: PropTypes.object,
  attending: PropTypes.bool,
  interested: PropTypes.bool,
  isAnonymous: PropTypes.bool
}

export function confSelector(state, props, dispatch) {
  const isAnonymous = state.user.isAnonymous;
  const username = state.user.name;
  const { conf, confKey, fbRef } = props;
  const attending = includes(props.conf.peopleGoing, username);
  const interested = includes(props.conf.peopleInterested, username);
  return { username, attending, interested, conf, dispatch, confKey, fbRef, isAnonymous };
}

export default connect(confSelector)(Conf);
