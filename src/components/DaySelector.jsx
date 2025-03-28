import React, { useState } from 'react'

const DaySelector = ({ onDayChange }) => {
    const [ selectedDay, setSelecteddDay] = useState('1');

const handleChange = (e) => {
    const day = e.target.value;
    setSelecteddDay(day);
    onDayChange(day);
}


  return (
    <select value={ selectedDay } onChange={ handleChange }>
         {[...Array(31)].map((_, index) => {
            const day = index + 1; // 1日から31日まで
            return (
                <option key={day} value={day}>
                {day}日
                </option>
            );
            })}
    </select>
    
  )
}

export default DaySelector


  