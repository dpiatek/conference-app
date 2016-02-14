import React from 'react';
import reduce from 'lodash/collection/reduce';
import map from 'lodash/collection/map';
import includes from 'lodash/collection/includes';
import assign from 'lodash/object/assign';
import difference from 'lodash/array/difference';
import Conf from './conf';
import ConfList from './conf-list';
import s from './calendar-container.css';
import { GOING_TO, INTERESTED_IN } from '../filter-list';

const months = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

const CalendarView = ({ conferences, fbRef, filters, userName }) => {
  const now = Date.now();

  const filterByUpcoming = reduce(conferences, (acc, value, key) => {
    return (new Date(value.dateFrom)).getTime() > now ? assign(acc, { [key]: value }) : acc;
  }, {});

  const checkForUserFilters = (tags, going, interested) => {
    const addGoingToFilter =
      includes(filters, GOING_TO) && includes(going, userName);
    const addInterestedInFilter =
      includes(filters, INTERESTED_IN) && includes(interested, userName);

    tags = tags || [];

    if (addGoingToFilter) {
      tags = tags.concat(GOING_TO);
    }

    if (addInterestedInFilter) {
      tags = tags.concat(INTERESTED_IN);
    }

    return tags;
  };

  const applyFilters = filters.length > 0 ? reduce(filterByUpcoming, (acc, value, key) => {
    const tags = checkForUserFilters(value.tags, value.peopleGoing, value.peopleInterested);
    const include = difference(filters, tags).length === 0;
    return include ? assign(acc, { [key]: value }) : acc;
  }, {}) : filterByUpcoming;

  const groupByYear = reduce(applyFilters, (acc, value, key) => {
    const year = (new Date(value.dateFrom)).getFullYear();
    const yearCollection = acc[year] || {};
    yearCollection[key] = value;
    return assign(acc, { [year]: yearCollection });
  }, {});

  const confsByYears = reduce(groupByYear, (acc, yearCollection, year) => {
    const collection = reduce(yearCollection, (acc, value, key) => {
      const month = (new Date(value.dateFrom)).getMonth();
      const monthCollection = acc[month] || {};
      monthCollection[key] = value;
      return assign(acc, { [month]: monthCollection });
    }, {});

    return assign(acc, { [year]: collection });
  }, {});

  return (
    <div className={s.container}>
      {map(confsByYears, (confsByMonths, year) =>
        <div className={s.yearContainer} key={year}>
          {Object.keys(confsByYears).length > 1 && <p>{year}</p>}
          {map(confsByMonths, (confs, month) =>
            <div key={month} className={s.monthContainer}>
              <p className={s.monthName}>{months[month]}</p>
              <ConfList conferences={confs} fbRef={fbRef} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

CalendarView.defaultProps = {
  filters: []
};

export default CalendarView;
