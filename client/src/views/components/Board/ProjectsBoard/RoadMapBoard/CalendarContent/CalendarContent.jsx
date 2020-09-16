import React, { useCallback, useRef, useEffect } from 'react';
import VizSensor from 'react-visibility-sensor';
import { useState } from 'react';
import moment from 'moment';
import getCalendarContent from './getCalendarContent';
import {
  Container,
  DayCell,
  InnerContainer,
  Content
} from './CalendarContent.style';

const CalendarContent = ({ today, changeMonth, currentMonth }) => {
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState([]);

  const containerRef = useRef(null);
  const dayCellRef = useRef([]);

  const currentYearOfCalendar = currentMonth.getFullYear();
  const currentMonthOfCalendar = currentMonth.getMonth();
  const calendarLength = 3;

  useEffect(() => {
    setCalendar(getCalendarContent(new Date(), calendarLength));
    setLoading(false)
  }, []);

  const observer = useRef();
  const lastCalendarDayRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const lastMonthOfCalendar = calendar[calendar.length - 1];
        const lastDayOfCalendar = lastMonthOfCalendar[lastMonthOfCalendar.length - 1];
        if (lastDayOfCalendar.yyyy >= today.yyyy + 2) return
        setCalendar(prevState => {
          return [
            ...prevState,
            ...getCalendarContent(new Date(lastDayOfCalendar.yyyy, lastDayOfCalendar.mm + 1), calendarLength)
          ]
        })
      }
    })
    if (node) observer.current.observe(node)
  })

  const scrollToPrevMonth = () => {
    if (calendar.length === 0) return;

    const isBeforeCurrent = moment(currentMonth).isBefore(today);
    const firstMonthOfCalendar = calendar[0][0];
    if (isBeforeCurrent &&
      currentYearOfCalendar === firstMonthOfCalendar.yyyy &&
      currentMonthOfCalendar === firstMonthOfCalendar.mm) {
      setCalendar(prevState => {
        return [
          ...getCalendarContent(new Date(currentYearOfCalendar, currentMonthOfCalendar - 1), 1),
          ...prevState
        ]
      })
      // @todo: Fix firefox scrollTop bug.
      containerRef.current.scrollTop = 0;
      return;
    }
    const prevMonthYear = currentMonthOfCalendar === 0 ? currentYearOfCalendar - 1 : currentYearOfCalendar;
    const prevMonth = currentMonthOfCalendar === 0 ? 11 : currentMonthOfCalendar - 1;
    dayCellRef.current[`${prevMonthYear}${prevMonth}${1}`].current.scrollIntoView()
  }

  const scrollToToday = () => {
    dayCellRef.current[`${today.yyyy}${today.mm}${1}`].current.scrollIntoView();
  }

  const scrollToNextMonth = () => {
    const nextMonthYear = currentMonthOfCalendar === 11 ? currentYearOfCalendar + 1 : currentYearOfCalendar;
    const nextMonth = currentMonthOfCalendar === 11 ? 0 : currentMonthOfCalendar + 1;
    dayCellRef.current[`${nextMonthYear}${nextMonth}${1}`].current.scrollIntoView()
  }

  const adjustFirstMonthLength = (calendar) => {
    let content = [];
    if (calendar.length > 1) {
      const currentFirstMonth = calendar[0][0];
      const firstDayStartAt = new Date(currentFirstMonth.yyyy, currentFirstMonth.mm, 1).getDay();
      const lastDayOfMonth = new Date(currentFirstMonth.yyyy, currentFirstMonth.mm, 0).getDate();
      for (let dd = lastDayOfMonth; dd > lastDayOfMonth - firstDayStartAt; dd--) {
        content = [
          {
            yyyy: currentFirstMonth.yyyy,
            mm: currentFirstMonth.mm - 1,
            dd: dd,
          },
          ...content
        ]
      }
    }
    return [
      content,
      ...calendar
    ]
  }

  return (
    <>
      <div className="container">
        <div className="monthlyCalendarHeader">
          <div className="monthAndyear">
            <span className="month">{moment(new Date(currentMonth)).format('MMMM')}</span>
            <span >{currentYearOfCalendar}</span>
          </div>
          <div className="button-container">
            <button className="moveButton" onClick={scrollToPrevMonth}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="returnButton" onClick={scrollToToday}>Today</button>
            <button className="moveButton" onClick={scrollToNextMonth}>
              <i className="fas fa-chevron-right"></i>
            </button>
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
          {
            adjustFirstMonthLength(calendar).map(month => {
              return (
                month.map((date) => {
                  const { yyyy, mm, dd, isToday, isFirstDayOfMonth, isLastDayOfCalendar } = date;
                  const isFocused = (currentMonthOfCalendar === mm);
                  // Create multiple refs based on a date.
                  dayCellRef.current[`${yyyy}${mm}${dd}`] = React.createRef();

                  return (
                    <VizSensor
                      key={`date_${yyyy}/${mm}/${dd}`}
                      offset={{ top: -10, bottom: 130 }}
                      containment={containerRef.current}
                      onChange={(isVisible) => { if (isVisible) { changeMonth(yyyy, mm) } }}
                      active={isFirstDayOfMonth ? true : false}
                    >
                      <DayCell
                        isFocused={isFocused}
                        ref={dayCellRef.current[`${yyyy}${mm}${dd}`]}
                        isToday={isToday}
                      >
                        <InnerContainer ref={isLastDayOfCalendar ? lastCalendarDayRef : null} >
                        </InnerContainer>
                        <Content>
                          {isFirstDayOfMonth && moment(new Date(yyyy, mm)).format('MMM')} {dd}
                        </Content>
                      </DayCell>
                    </VizSensor>
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