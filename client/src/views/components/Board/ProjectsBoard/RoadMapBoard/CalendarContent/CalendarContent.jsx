import React, { useCallback, useRef } from 'react';
import VizSensor from 'react-visibility-sensor';
import { useState } from 'react';
import useCalendarMonth from './useCalendarMonth';
import moment from 'moment';
import {
  Container,
  DayCell,
  InnerContainer,
  InnerRef,
  Content
} from './CalendarContent.style';

const CalendarContent = ({ currentDate, changeMonth, currentMonth, currentMonthRef, todayRef}) => {
  const [startMonth, setStartMonth] = useState(new Date());
  const calendarLength = 4;

  const {
    calendar,
    loading,
    lastDayOfCalendar
  } = useCalendarMonth(startMonth, calendarLength);

  const observer = useRef();
  const lastCalendarDayRef = useCallback(node => {
    if (loading) return
    if (lastDayOfCalendar.yyyy >= currentDate.yyyy + 2) return

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setStartMonth(new Date(lastDayOfCalendar.yyyy, lastDayOfCalendar.mm + 1))
      }
    })
    if (node) observer.current.observe(node)
  })

  return (
    <>
      <div className="content-container">
        <Container className="grid-container">
          {calendar.map(date => {
            const { yyyy, mm, dd, isToday, isFirstDayOfMonth, isLastDayOfCalendar } = date;
            return (
              <DayCell isFirstDayOfMonth={isFirstDayOfMonth} isToday={isToday} key={`date_${yyyy}_${mm}_${dd}`}>
                <VizSensor onChange={(isVisible) => { if (isVisible) { changeMonth(yyyy, mm) } }} active={isFirstDayOfMonth ? true : false}>
                  <InnerContainer ref={isLastDayOfCalendar ? lastCalendarDayRef : null} >
                    <InnerRef ref={isToday ? todayRef : null}></InnerRef>
                    <Content>
                      {isFirstDayOfMonth && moment(new Date(yyyy, mm)).format('MMM')} {dd}
                    </Content>
                  </InnerContainer>
                </VizSensor>
              </DayCell>
            );
          })}
        </Container>
        <div>{loading && 'Loading...'}</div>
      </div>
    </>
  )
}

export default CalendarContent;