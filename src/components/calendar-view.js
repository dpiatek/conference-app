import React from 'react';
import reduce from 'lodash/collection/reduce';
import map from 'lodash/collection/map';
import assign from 'lodash/object/assign';
import Conf from './conf';
import ConfList from './conf-list';
import s from './calendar-container.css';

const months = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

const CalendarView = ({ conferences, fbRef }) => {
  const groupByYear = reduce(conferences, (acc, value, key) => {
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
        <div key={year}>
          {Object.keys(confsByYears).length > 1 && <p>{year}</p>}
          {map(confsByMonths, (confs, month) =>
            <div key={month}>
              <p>{months[month]}</p>
              <ConfList conferences={confs} fbRef={fbRef} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarView;
