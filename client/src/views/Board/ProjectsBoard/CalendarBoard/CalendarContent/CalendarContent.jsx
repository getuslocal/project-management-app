import React, { useState, useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';
import DayCell from './DayCell/DayCell'
import VisibilitySensor from 'react-visibility-sensor'
import {
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
    content.push(dateStart.clone());
    dateStart.add(1, 'weeks');
  }
  return content
}

// Use react memo for DayCell to prevent unnecessary renders.
const DayCellMemo = React.memo(props => {
  const { momentDate } = props;
  return (
    <DayCell momentDate={moment(momentDate)} />
  )
})

const CalendarContent = ({
  setLoading,
  setCurrentMonth,
  weekCellRef
}) => {
  const [calendar, setCalendar] = useState([]);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Get calendar content data.
    setCalendar(getCalendarContent());
    // After render calendar content.
    setLoading(false);
    // Set scroll bar width for the container element.
    setScrollbarWidth(containerRef.current.offsetWidth - containerRef.current.clientWidth)
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
    }
  }

  // Create multiple refs based on a week.
  const getWeekCellRef = (momentDate, el) => {
    const isFirstDayOfMonth = momentDate.isSame(moment(momentDate).startOf('month'), 'day');
    const isFirstWeekOfNextMonth = momentDate.isSame(moment(momentDate).add(1, 'months').startOf('month'), 'week');
    if (isFirstDayOfMonth) {
      return weekCellRef.current[momentDate.format('YYYY-MM')] = el;
    } else if (isFirstWeekOfNextMonth) {
      return weekCellRef.current[moment(momentDate).add(1, 'months').format('YYYY-MM')] = el;
    } else {
      return null
    }
  }
  //   const calculateScrollbarWidth = (containerRef) => {
  return (
    <Fragment>
      <Top style={{paddingRight: scrollbarWidth}}>
        <DayName>Sun</DayName>
        <DayName>Mon</DayName>
        <DayName>Tue</DayName>
        <DayName>Wed</DayName>
        <DayName>Thu</DayName>
        <DayName>Fri</DayName>
        <DayName>Sat</DayName>
      </Top>
      <Bottom ref={containerRef}>
        {calendar.map(firstDayOfWeek => (
          <VisibilitySensor
            key={firstDayOfWeek.format('YYYY/MM/DD')}
            containment={containerRef.current}
            offset={{ bottom: 100, top: -100 }}
            onChange={isVisible => onChange(isVisible, firstDayOfWeek)}
          >
            <Week ref={el => getWeekCellRef(firstDayOfWeek, el)}>
              <DayCellMemo momentDate={moment(firstDayOfWeek).format('LL')} />
              <DayCellMemo momentDate={moment(firstDayOfWeek).add(1, 'days').format('LL')} />
              <DayCellMemo momentDate={moment(firstDayOfWeek).add(2, 'days').format('LL')} />
              <DayCellMemo momentDate={moment(firstDayOfWeek).add(3, 'days').format('LL')} />
              <DayCellMemo momentDate={moment(firstDayOfWeek).add(4, 'days').format('LL')} />
              <DayCellMemo momentDate={moment(firstDayOfWeek).add(5, 'days').format('LL')} />
              <DayCellMemo momentDate={moment(firstDayOfWeek).add(6, 'days').format('LL')} />
            </Week>
          </VisibilitySensor>
        ))}
      </Bottom>
    </Fragment>

  )
}

CalendarContent.propTypes = {
  containerRef: PropTypes.object,
  weekCellRef: PropTypes.object,
  setLoading: PropTypes.func.isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
}

export default CalendarContent;