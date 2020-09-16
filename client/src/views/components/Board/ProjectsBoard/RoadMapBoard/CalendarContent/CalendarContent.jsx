import React, { useCallback, useRef } from 'react';
import VizSensor from 'react-visibility-sensor';
import { useState } from 'react';
import useCalendarMonth from './useCalendarMonth';
import moment from 'moment';
import {
  Container,
  DayCell,
  InnerContainer,
  Content
} from './CalendarContent.style';

const CalendarContent = ({ today, changeMonth, currentMonth }) => {
  const [startMonth, setStartMonth] = useState(new Date());
  const [isPrevMonth, setIsPrevMonth] = useState(false);
  const containerRef = useRef(null);
  const dayCellRef = useRef([]);
  const currentYearOfCalendar = currentMonth.getFullYear();
  const currentMonthOfCalendar = currentMonth.getMonth();
  const calendarLength = 2;
  const {
    calendar,
    loading,
    lastDayOfCalendar,
  } = useCalendarMonth(startMonth, calendarLength, isPrevMonth);

  const observer = useRef();
  const lastCalendarDayRef = useCallback(node => {
    if (loading) return
    if (lastDayOfCalendar.yyyy >= today.yyyy + 2) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsPrevMonth(false)
        setStartMonth(new Date(lastDayOfCalendar.yyyy, lastDayOfCalendar.mm + 1))
      }
    })
    if (node) observer.current.observe(node)
  })


  const scrollToPrevMonth = () => {
    const isBeforeCurrent = moment(currentMonth).isBefore(today);
    const firstMonthOfCalendar = calendar[0][0];
    if (isBeforeCurrent &&
      currentYearOfCalendar === firstMonthOfCalendar.yyyy &&
      currentMonthOfCalendar === firstMonthOfCalendar.mm) {
      setIsPrevMonth(true);
      setStartMonth(new Date(currentYearOfCalendar, currentMonthOfCalendar - 1));
      containerRef.current.scrollTop = 0;
      return;
    }
    const prevMonthYear = currentMonthOfCalendar === 0 ? currentYearOfCalendar - 1 : currentYearOfCalendar;
    const prevMonth = currentMonthOfCalendar === 0 ? 11 : currentMonthOfCalendar - 1;
    dayCellRef.current[`${prevMonthYear}${prevMonth}${1}`].current.scrollIntoView({
      behavior: "smooth",
    })
  }

  const scrollToToday = () => {
    dayCellRef.current[`${today.yyyy}${today.mm}${1}`].current.scrollIntoView();
  }

  const scrollToNextMonth = () => {
    const nextMonthYear = currentMonthOfCalendar === 11 ? currentYearOfCalendar + 1 : currentYearOfCalendar;
    const nextMonth = currentMonthOfCalendar === 11 ? 0 : currentMonthOfCalendar + 1;
    dayCellRef.current[`${nextMonthYear}${nextMonth}${1}`].current.scrollIntoView({
      behavior: "smooth",
    })
  }

  console.log(calendar)

  return (
    <>
      <div className="container">
        <div className="monthlyCalendarHeader">
          <div className="monthAndyear">
            <span className="month">{moment(new Date(currentMonth)).format('MMMM')}</span>
            <span >{currentYearOfCalendar}</span>
          </div>
          <div className="button-container">
            <button className="returnButton" onClick={scrollToPrevMonth}>Prev</button>
            <button className="returnButton" onClick={scrollToToday}>TODAY</button>
            <button className="returnButton" onClick={scrollToNextMonth}>Next</button>
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
      <div className="content-container">
        <Container test={"test"} className="grid-container" ref={containerRef}>
          <DayCell>30</DayCell>
          <DayCell>31</DayCell>
          {
            calendar.map(month => {
              return (
                month.map(date => {
                  const { yyyy, mm, dd, isToday, isWeekEnd, isFirstDayOfMonth, isLastDayOfCalendar } = date;
                  const isFocused = (currentMonthOfCalendar === mm)
                  dayCellRef.current[`${yyyy}${mm}${dd}`] = React.createRef();
                  return (
                    <DayCell
                      isWeekEnd={isWeekEnd}
                      isFocused={isFocused}
                      ref={dayCellRef.current[`${yyyy}${mm}${dd}`]}
                      sFirstDayOfMonth={isFirstDayOfMonth}
                      isToday={isToday}
                      key={`date_${yyyy}_${mm}_${dd}`}
                    >
                      <VizSensor
                        offset={{ bottom: 130 }}
                        containment={containerRef.current}
                        onChange={(isVisible) => { if (isVisible) { changeMonth(yyyy, mm) } }}
                        active={isFirstDayOfMonth ? true : false}
                      >
                        <InnerContainer ref={isLastDayOfCalendar ? lastCalendarDayRef : null} >
                          <Content>
                            {isFirstDayOfMonth && moment(new Date(yyyy, mm)).format('MMM')} {dd}
                          </Content>
                        </InnerContainer>
                      </VizSensor>
                    </DayCell>
                  );
                })
              )
            })
          }
        </Container>
        <div>{loading && 'Loading...'}</div>
      </div>
    </>
  )
}

export default CalendarContent;