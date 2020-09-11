import React, { useState, useRef, useEffect } from 'react';
import './temp.css'
import VizSensor from 'react-visibility-sensor';
import styled from 'styled-components';

const Container = styled.div`
      /* overflow-y: scroll;
    max-height: 670px; */
    padding: 1px 0;
`

const RoadMapBoard = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const changeMonth = (yyyy, mm) => {
    // console.log('setState')
    setCurrentMonth(new Date(yyyy, mm))
  }
  return (
    <div className="monthlyCalendar">
      <MonthlyCalendarContent currentMonth={currentMonth} changeMonth={changeMonth} monthRanges={24} />
    </div>
  );
}

const MonthlyCalendarContent = ({ currentMonth, changeMonth, monthRanges }) => {
  const outerContent = [];
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const date = new Date().getDate();
  const today = `${year}${month}${date}`;
  const myRef = useRef(null);
  const containerRef = useRef(null);
  let thisMonth = new Date(year, month, 1);
  const MonthName = currentMonth.toLocaleString('default', { month: 'long' });

  useEffect(() => {
    scrollToRef(myRef)
  }, []);

  const scrollToRef = (ref) => {
    changeMonth(year, month)
    ref.current.scrollIntoView(true)
  }

  for (let monthCount = 0; monthCount <= monthRanges; monthCount++) {
    const adjustment = (- monthRanges / 2);
    thisMonth = new Date(thisMonth.setMonth(thisMonth.getMonth() + (monthCount == 0 ? adjustment : 1)));
    const content = [];
    const yyyy = thisMonth.getFullYear();
    const mm = thisMonth.getMonth();
    const lastDayOfMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0);
    const MonthName = thisMonth.toLocaleString('default', { month: 'long' });

    for (let dayCount = 1; dayCount <= lastDayOfMonth.getDate(); dayCount++) {
      let isToday = false;

      if (`${yyyy}${mm}${dayCount}` == today) {
        isToday = true;
      }

      if (dayCount === 1) {
        content.push(
          <VizSensor
            containment={containerRef.current}
            onChange={(isVisible) => { if (isVisible) { changeMonth(yyyy, mm) } }}
            key={`sensor_${yyyy}${mm}${dayCount}`}
          >
            <div className="firstDay day" ref={isToday ? myRef : null}>
              <span>{MonthName} </span>{dayCount}
            </div>
          </VizSensor>
        )
        continue
      }

      content.push(
        <div
          key={`date_${yyyy}${mm}${dayCount}`}
          className={`${isToday ? 'today' : ''}  day`}
          ref={isToday ? myRef : null}
        >
          {dayCount}
        </div>
      );
    }
    outerContent.push(content)
  }


  return (
    <>
      <div className="monthlyCalendarHeader">
        <div className="monthAndyear">
          <span className="month">{MonthName}</span>
          <span >{currentMonth.getFullYear()}</span>
          {/* <span onClick={()=> changeMonth(currentMonth.getFullYear(), currentMonth.getMonth() + 1)} className="btnChangeMonth">></span> */}
        </div>
        <button className="returnButton" onClick={() => scrollToRef(myRef)} >Today</button>
      </div>
      <div className="content-container">
        <div className="day-grid-container">
          <div className="dayCell">Sun</div>
          <div className="dayCell">Mon</div>
          <div className="dayCell">Tue</div>
          <div className="dayCell">Wed</div>
          <div className="dayCell">Thu</div>
          <div className="dayCell">Fri</div>
          <div className="dayCell">Sat</div>
        </div>
        <Container ref={containerRef}>
          <div className="grid-container">
            {outerContent}
          </div>
        </Container>
      </div>
    </>
  )
}

export default RoadMapBoard