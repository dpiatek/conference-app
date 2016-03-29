import React, { PropTypes } from 'react';
import styles from './conf.css';

const ConfButton = ({ addCallback, removeCallback, disabled = false, flag, btnText }) => {
  const callback = flag ? removeCallback : addCallback;

  return (
    <label className={`${styles.button}`}>
      <input
        type="checkbox"
        value={flag}
        checked={flag}
        disabled={disabled} onChange={callback} />
      {btnText}
    </label>
  );
};

ConfButton.propTypes = {
  addCallback: PropTypes.func,
  removeCallback: PropTypes.func,
  disabled: PropTypes.bool,
  flag: PropTypes.bool,
  btnText: PropTypes.string
}

export default ConfButton;
