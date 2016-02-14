import React, { Component, PropTypes } from 'react';
import any from 'lodash/collection/any';
import styles from './filters.css';
import { filterByTag, removeTagFilter } from '../actions';
import { filterList } from '../filter-list';

class Filters extends Component {
  handleClick(filter, isEnabled) {
    const { dispatch, filters } = this.props;

    if (isEnabled) {
      dispatch(removeTagFilter(filter));
    } else {
      dispatch(filterByTag(filter));
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <ul>
          {filterList.map(filter => {
            const isEnabled = any(this.props.filters, f => f === filter);
            const classes = `${styles.filter} ${isEnabled && styles.filterActive}`;

            return (
              <li key={filter}>
                <button
                  className={classes}
                  type="button"
                  onClick={this.handleClick.bind(this, filter, isEnabled)}>
                  {filter}</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

Filters.propTypes = {
  filters: PropTypes.array,
  dispatch: PropTypes.func
};

export default Filters;
