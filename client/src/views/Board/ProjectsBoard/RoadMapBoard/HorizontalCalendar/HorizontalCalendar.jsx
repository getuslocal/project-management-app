import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Container,
  DayCell,
  DayName,
  Day,
  Border,
  MonthName
} from './HorizontalCalendar.style'

const getCalendarContent = (todayCellRef) => {
  const days = []
  const dateStart = moment().subtract(1, 'years')
  const dateEnd = moment().add(1, 'years')
  while (dateEnd.diff(dateStart, 'days') >= 0) {
    const isToday = dateStart.isSame(moment(), 'day');
    days.push(
      <DayCell key={`${dateStart.year()}-${dateStart.month()}-${dateStart.date()}`} ref={isToday ? todayCellRef : null}>
        {
          dateStart.day() === 4 &&
          <MonthName style={{ marginBottom: '5px' }}>
            {dateStart.format('MMM')}
            {dateStart.year() !== moment().year() && " '" + dateStart.format('YY')}
          </MonthName>
        }
        <Day isToday={isToday}>
          <DayName>{dateStart.format('dd').charAt(0)}</DayName>
          {dateStart.format('D')}
          <Border isWeekend={(dateStart.day() === 0 || dateStart.day() === 6)}></Border>
        </Day>
      </DayCell>
    )
    dateStart.add(1, 'days')
  }
  return days
}

const HorizontalCalendar = ({ todayCellRef }) => {

  return (
    <Container>
      {getCalendarContent(todayCellRef)}
    </Container>
  )
}

HorizontalCalendar.propTypes = {

}

export default HorizontalCalendar
