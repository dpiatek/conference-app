import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { showFilters, hideFilters } from '../actions';
import s from './user.css';


const User = ({ user, fbRef, view, pathname, showFilterBar, hideFilterBar }) => {
  const logout = () => fbRef.unauth();
  const isRoot = pathname === "/";
  const filterCallback = view.showFilters ? hideFilterBar : showFilterBar;
  const filterButtonText = view.showFilters ? "Hide Filters" : "Show Filters";
  const isAnonymous = user.isAnonymous;

  return (
    <header className={s.container}>
      <div className={s.buttons}>
        {isAnonymous ? null : (isRoot ?
          <Link to="/new">Add Event</Link> :
          <Link to="/">Go back</Link>)}

        {isRoot ?
          <button onClick={filterCallback} className={s.menuButton}>
            {filterButtonText}
          </button> :
          null}
      </div>

      <div>
        <p className={s.userName}>Hi, {user.name}</p>
        <button onClick={logout} className={s.logoutButton}>Logout</button>
      </div>
    </header>
  );
};

User.propTypes = {
  user: PropTypes.object,
  fbRef: PropTypes.object,
  view: PropTypes.object,
  pathname: PropTypes.string,
  showFilterBar: PropTypes.func,
  hideFilterBar: PropTypes.func
}

export default connect(state => state, dispatch => ({
  showFilterBar: () => dispatch(showFilters()),
  hideFilterBar: () => dispatch(hideFilters())
}))(User);
