import React, { Fragment, useRef, useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import CalendarContent from './CalendarContent/CalendarContent';
import { withRouter } from 'react-router-dom'

const CalendarBoard = ({ ...props }) => {
  const [currentMonth, setCurrentMonth] = useState(moment())
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const currentWeekRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      scrollToToday()
    }
  }, [loading]);

  const scrollToToday = () => {
    currentWeekRef.current.scrollIntoView();
    setCurrentMonth(moment())
  }

  return (
    <Fragment>
      <CalendarHeader
        currentMonth={currentMonth}
        scrollToToday={scrollToToday}
      />
      <CalendarContent
        containerRef={containerRef}
        currentWeekRef={currentWeekRef}
        setLoading={setLoading}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
    </Fragment>
  )
}

export default withRouter(CalendarBoard);