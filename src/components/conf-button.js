import React, { Component } from 'react';

const ConfButton = ({ callback, flag, notAvailableText, btnText }) => {
  if (flag) {
    return <span>{notAvailableText}</span>;
  } else {
    return (
      <button
        type="button"
        disabled={flag}
        onClick={callback}>{btnText}</button>
    );
  }
}

export default ConfButton;
