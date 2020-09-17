import React, { useCallback, useRef, useEffect } from 'react';
import VizSensor from 'react-visibility-sensor';
import { useState } from 'react';
import moment from 'moment';
import getCalendarContent from './getCalendarContent';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import {
  Container,
  DayCell,
  InnerContainer,
  Content
} from './Calendar.style';

// @todo: Sensor improvement
// @todo: Week div container
const Calendar = () => {
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = {
    yyyy: new Date().getFullYear(),
    mm: new Date().getMonth(),
    dd: new Date().getDate(),
  }

  const changeMonth = (yyyy, mm) => {
    setCurrentMonth(new Date(yyyy, mm))
  }

  // Create some refs to scroll to specific element.
  const containerRef = useRef(null);
  const dayCellRef = useRef([]);

  const currentYearOfCalendar = currentMonth.getFullYear();
  const currentMonthOfCalendar = currentMonth.getMonth();
  const calendarLength = 3;
  const lastMonthOfCalendar = calendar[calendar.length - 1];
  let lastDayOfCalendar = undefined;

  // Get the very last day of current calendar.
  if (lastMonthOfCalendar && lastMonthOfCalendar.length > 0) {
    lastDayOfCalendar = lastMonthOfCalendar[lastMonthOfCalendar.length - 1];
  }

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
        if (lastDayOfCalendar && lastDayOfCalendar.yyyy >= today.yyyy + 2) return
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
  // console.log(calendar)

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
    if (lastDayOfCalendar && lastDayOfCalendar.yyyy >= today.yyyy + 2 &&
      currentMonthOfCalendar === lastDayOfCalendar.mm &&
      currentYearOfCalendar === lastDayOfCalendar.yyyy
    ) return
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
      <CalendarHeader
        currentMonth={currentMonth}
        scrollToPrevMonth={scrollToPrevMonth}
        scrollToToday={scrollToToday}
        scrollToNextMonth={scrollToNextMonth}
      />
      <Container ref={containerRef}>
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
                    offset={{ top: -5, bottom: 130 }}
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
                      <Content isToday={isToday}>
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
    </>
  )
}

export default Calendar;