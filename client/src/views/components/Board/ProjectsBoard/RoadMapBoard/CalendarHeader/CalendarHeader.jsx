import React from 'react';

const CalandarHeader = ({ currentMonth, currentDate, todayRef, changeMonth }) => {
  const MonthName = currentMonth.toLocaleString('default', { month: 'long' });

  const scrollToToday = (ref) => {
    changeMonth(currentDate.yyyy, currentDate.mm)
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <div className="container">
      <div className="monthlyCalendarHeader">
        <div className="monthAndyear">
          <span className="month">{MonthName}</span>
          <span >{currentMonth.getFullYear()}</span>
        </div>
        <div className="button-container">
          <button className="returnButton" onClick={() => scrollToToday(todayRef)} >TODAY</button>
        </div>
      </div>
      <div className="day-grid-container">
        <div className="dayCell">Sun</div>
        <div className="dayCell">Mon</div>
        <div className="dayCell">Tue</div>
        <div className="dayCell">Wed</div>
        <div className="dayCell">Thu</div>
        <div className="dayCell">Fri</div>
        <div className="dayCell">Sat</div>
      </div>
    </div>
  );
}

export default CalandarHeader;