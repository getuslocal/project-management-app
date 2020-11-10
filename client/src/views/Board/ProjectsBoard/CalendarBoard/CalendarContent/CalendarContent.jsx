import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DayCell from './DayCell/DayCell'
import VisibilitySensor from 'react-visibility-sensor'
import {
  Container,
  Top,
  DayName,
  Bottom,
  Week,
} from './CalendarContent.style';

// Return weely calendar data with momentjs object.
const getCalendarContent = () => {
  const content = [];
  const dateStart = moment().subtract(12, 'months').startOf('month').day("Sunday");
  const dateEnd = moment().add(12, 'months').endOf('month').day("Saturday");
  while (dateEnd.diff(dateStart, 'weeks') >= 0 && dateStart.isSameOrBefore(dateEnd)) {
    content.push(dateStart.clone())
    dateStart.add(1, 'weeks')
  }
  return content
}

const CalendarContent = ({
  containerRef,
  setLoading,
  currentMonth,
  setCurrentMonth,
  currentWeekRef
}) => {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    // Get calendar content data.
    setCalendar(getCalendarContent());
    // After render calendar content.
    setLoading(false);
  }, []);

  const onChange = (isVisible, firstDayOfWeek) => {
    if (!isVisible) return;
    // Check if the week starts with day 1.
    const isFirstDayOfMonth = (firstDayOfWeek.date() === 1);
    // Check if the week starts with prev month last days.
    const isFirstWeekOfNextMonth = firstDayOfWeek.isSame(moment(firstDayOfWeek).add(1, 'months').startOf('month'), 'week');
    // Set current month state based on the week type.
    if (isFirstDayOfMonth) {
      setCurrentMonth(firstDayOfWeek)
    } else if (isFirstWeekOfNextMonth) {
      setCurrentMonth(moment(firstDayOfWeek).add(1, 'months'))
    } else {
      return;
    }
  }

  return (
    <Container>
      <Top>
        <DayName>Sun</DayName>
        <DayName>Mon</DayName>
        <DayName>Tue</DayName>
        <DayName>Wed</DayName>
        <DayName>Thu</DayName>
        <DayName>Fri</DayName>
        <DayName>Sat</DayName>
      </Top>
      <Bottom ref={containerRef} >
        {calendar.map(firstDayOfWeek => (
          <VisibilitySensor
            key={firstDayOfWeek.format('YYYY/MM/DD')}
            containment={containerRef.current}
            offset={{ bottom: 200, top: -20 }}
            onChange={isVisible => onChange(isVisible, firstDayOfWeek)}
          >
            <Week ref={firstDayOfWeek.isSame(moment().startOf('month'), 'week') ? currentWeekRef : null}>
              <DayCell currentMonth={currentMonth} momentDate={firstDayOfWeek.clone()} />
              <DayCell currentMonth={currentMonth} momentDate={firstDayOfWeek.clone().add(1, 'days')} />
              <DayCell currentMonth={currentMonth} momentDate={firstDayOfWeek.clone().add(2, 'days')} />
              <DayCell currentMonth={currentMonth} momentDate={firstDayOfWeek.clone().add(3, 'days')} />
              <DayCell currentMonth={currentMonth} momentDate={firstDayOfWeek.clone().add(4, 'days')} />
              <DayCell currentMonth={currentMonth} momentDate={firstDayOfWeek.clone().add(5, 'days')} />
              <DayCell currentMonth={currentMonth} momentDate={firstDayOfWeek.clone().add(6, 'days')} />
            </Week>
          </VisibilitySensor>
        ))}
      </Bottom>
    </Container>
  )
}


export default CalendarContent;