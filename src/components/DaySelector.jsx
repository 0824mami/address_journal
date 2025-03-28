import React from 'react'

const DaySelector = ({ onDayChange }) => {
  return (
    <select onChange={(e) => onDayChange(e.target.value)} className="day-select">
      {[...Array(31)].map((_, index) => (
        <option key={index + 1} value={index + 1}>
          {index + 1}日
        </option>
      ))}
    </select>
  );
};

export default DaySelector


  