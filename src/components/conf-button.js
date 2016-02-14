import React, { Component } from 'react';
import styles from './conf.css';

const ConfButton = ({ addCallback, removeCallback, disabled, flag, btnText }) => {
  const callback = flag ? removeCallback : addCallback;
  const color = flag ? styles.red : styles.green;

  return (
    <button
      className={`${styles.button} ${color}`}
      disabled={disabled}
      type="button"
      onClick={callback}>{btnText}</button>
  );
};

export default ConfButton;
