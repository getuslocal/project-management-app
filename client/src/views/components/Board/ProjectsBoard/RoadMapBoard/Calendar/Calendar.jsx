import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { getCalendarContent, getCalendarOfMonth } from './getCalendarContent';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectEpicTickets } from '../../../../../../redux/tickets/tickets.selectors';
import TicketModal from '../../KanbanBoard/Column/Ticket/TicketModal/TicketModal';
import CalendarTask from './CalendarTask/CalendarTask';
import {
  Container,
  DayCell,
  Content,
  Week,
  Header,
} from './Calendar.style';

const Calendar = ({ epics }) => {
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState([]);
  const [lastWeekOfCalendar, setLastWeekOfCalendar] = useState(null);
  const [firstMonthOfCalendar, setFirstMonthOfCalendar] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = {
    yyyy: new Date().getFullYear(),
    mm: new Date().getMonth(),
    dd: new Date().getDate(),
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeMonth = (yyyy, mm) => {
    setCurrentMonth(new Date(yyyy, mm))
  }

  // Create some refs to scroll to specific element.
  const containerRef = useRef(null);
  const weekCellRef = useRef([]);

  const currentYearOfCalendar = currentMonth.getFullYear();
  const currentMonthOfCalendar = currentMonth.getMonth();

  useEffect(() => {
    const calendar = getCalendarContent(moment(new Date(today.yyyy, today.mm)));
    setCalendar(calendar);
    setLastWeekOfCalendar(calendar[calendar.length - 1][0])
    setFirstMonthOfCalendar(calendar[0][6])
    setLoading(false)
  }, []);

  const scrollToPrevMonth = () => {
    const { yyyy, mm } = firstMonthOfCalendar;
    // Check if current month is the first month of calendar
    if (currentYearOfCalendar === yyyy && currentMonthOfCalendar === mm) {
      // Get previous month content
      const prevMonth = getCalendarOfMonth(moment(new Date(currentYearOfCalendar, currentMonthOfCalendar - 1)));
      setCalendar([...prevMonth, ...calendar])
      changeMonth(currentYearOfCalendar, currentMonthOfCalendar - 1)
      setFirstMonthOfCalendar(prevMonth[0][6])
      return
    }

    const prevMonth = new Date(currentYearOfCalendar, currentMonthOfCalendar - 1);
    weekCellRef.current[`${prevMonth.getFullYear()}${prevMonth.getMonth()}`].current.scrollIntoView()
  }

  const scrollToToday = () => {
    weekCellRef.current[`${today.yyyy}${today.mm}`].current.scrollIntoView();
    changeMonth(today.yyyy, today.mm)
  }

  const scrollToNextMonth = () => {
    const nextMonth = new Date(currentYearOfCalendar, currentMonthOfCalendar + 1);
    weekCellRef.current[`${nextMonth.getFullYear()}${nextMonth.getMonth()}`].current.scrollIntoView()
  }

  const getNextMonthPos = () => {
    const nextMonth = new Date(currentYearOfCalendar, currentMonthOfCalendar + 1);
    const nextMonthRef = weekCellRef.current[`${nextMonth.getFullYear()}${nextMonth.getMonth()}`]
    if (!nextMonthRef) return null;

    return nextMonthRef.current.offsetTop;
  }

  const getPrevMonthPos = () => {
    const prevMonth = new Date(currentYearOfCalendar, currentMonthOfCalendar - 1);
    const prevMonthRef = weekCellRef.current[`${prevMonth.getFullYear()}${prevMonth.getMonth()}`]
    if (!prevMonthRef) return null;

    return prevMonthRef.current.offsetTop;
  }

  const onScroll = () => {

    const scrollY = containerRef.current.scrollTop // Don't get confused by what's scrolling - It's not the window

    const targetDate = new Date(lastWeekOfCalendar.yyyy, lastWeekOfCalendar.mm - 1);
    const targetYear = targetDate.getFullYear()
    const targetMonth = targetDate.getMonth()
    const targetRef = weekCellRef.current[`${targetYear}${targetMonth}`].current.offsetTop;

    // const nxt = weekCellRef.current.filter(ref => ref.current.offsetTop >= scrollY)[0];

    if (scrollY >= targetRef) {
      const nextDate = moment(new Date(lastWeekOfCalendar.yyyy, lastWeekOfCalendar.mm, lastWeekOfCalendar.dd)).weekday(7);
      const isEndOfCalendar = (nextDate.year() >= today.yyyy + 2);

      if (isEndOfCalendar) {
        const { yyyy, mm } = firstMonthOfCalendar;
        weekCellRef.current[`${yyyy}${mm}`].current.scrollIntoView()
        changeMonth(yyyy, mm)
        return
      }

      if (!isEndOfCalendar) {
        const nextStartMonth = moment(new Date(lastWeekOfCalendar.yyyy, lastWeekOfCalendar.mm, lastWeekOfCalendar.dd)).weekday(7).month();
        const nextStartDayOfWeek = moment(new Date(lastWeekOfCalendar.yyyy, lastWeekOfCalendar.mm, lastWeekOfCalendar.dd)).weekday(6).date() + 1;
        console.log(lastWeekOfCalendar)
        const newCalendar = getCalendarContent(moment(new Date(lastWeekOfCalendar.yyyy, nextStartMonth, nextStartDayOfWeek)), true);
        setCalendar([...calendar, ...newCalendar]);
        setLastWeekOfCalendar(newCalendar[newCalendar.length - 1][0])
      }
    }

    const nextMonthPos = getNextMonthPos()
    const prevMonthPos = getPrevMonthPos()
    const offset = 10;

    // When fast scrolling, the first month can be skipped so fix it. 
    if (scrollY === 0) {
      changeMonth(firstMonthOfCalendar.yyyy, firstMonthOfCalendar.mm)
      return
    }

    if (scrollY >= nextMonthPos - offset && nextMonthPos !== null) {
      changeMonth(currentYearOfCalendar, currentMonthOfCalendar + 1)
    } else if (scrollY <= prevMonthPos + offset && prevMonthPos !== null) {
      changeMonth(currentYearOfCalendar, currentMonthOfCalendar - 1)
    }
  }

  // Create multiple refs based on a week.
  const getWeekCellRef = (week, arrayRef) => {
    const firstWeekOfThisMonth = week.find(week => week.dd === 1);
    if (firstWeekOfThisMonth) {
      const { yyyy, mm } = firstWeekOfThisMonth;
      arrayRef.current[`${yyyy}${mm}`] = React.createRef();
      return arrayRef.current[`${yyyy}${mm}`]
    }
    return null
  }

  return (
    <>
      <CalendarHeader
        currentMonth={currentMonth}
        scrollToPrevMonth={scrollToPrevMonth}
        scrollToToday={scrollToToday}
        scrollToNextMonth={scrollToNextMonth}
      />
      <Container ref={containerRef} onScroll={onScroll}>
        {
          calendar.map((week, index) => {
            return (
              <Week key={index} ref={getWeekCellRef(week, weekCellRef)}>
                {
                  week.map((date) => {
                    const { yyyy, mm, dd } = date;
                    const isFocused = (currentMonthOfCalendar === mm);
                    const isToday = (moment(`${yyyy}-${mm + 1}-${dd}`).isSame(moment().format("YYYY-MM-DD")));
                    return (
                      <DayCell
                        key={`${yyyy}${mm}${dd}`}
                        isFocused={isFocused}
                        isToday={isToday}
                      // onClick={() => console.log('DayCell clicked')}
                      >
                        <Content>
                          <Header isToday={isToday}>
                            {dd === 1 && moment(new Date(yyyy, mm)).format('MMM')} {dd}
                          </Header>
                          <CalendarTask epics={epics} date={date} setIsModalOpen={setIsModalOpen}/>
                        </Content>
                      </DayCell>
                    );
                  })}
              </Week>
            )
          })
        }
      </Container>
      <div>{loading && 'Loading...'}</div>
      {
        isModalOpen && (
          <TicketModal
            ticket={isModalOpen}
            projectId={"5f416cea4c4a05257179ea2d"}
            isEpicTicket={true}
            setIsModalOpen={setIsModalOpen}
          // deleteTicket={() => deleteTicket(ticket._id, columnId, projectId)}
          />
        )
      }
    </>
  )
}

Calendar.propTypes = {
  epics: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  epics: selectEpicTickets,
});

export default connect(mapStateToProps, null)(Calendar);