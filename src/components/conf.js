import React from 'react';

const Conf = ({ conf }) => {
  return (
    <li>
      <div>
        <a href={conf.website}>{conf.name}</a>
      </div>
      <div>{conf.topic}</div>
      <div>From: {conf.dateFrom}</div>
      <div>To: {conf.dateTo}</div>

      <div>
        <button>I'm going!</button>
        <button>Maybe going</button>
      </div>

      <div>People going:</div>
      <ul>
        <li>Bob</li>
        <li>Alice</li>
        <li>Krampus</li>
      </ul>
    </li>
  );
}

export default Conf;
