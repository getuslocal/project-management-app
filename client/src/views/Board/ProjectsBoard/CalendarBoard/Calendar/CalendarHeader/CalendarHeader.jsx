import React from 'react';
import moment from 'moment';
import {
  TopContent,
  Left,
  Month,
  Right,
  TodayButton,
  MoveButton,
  BottomContent,
  DayCell
} from './CalendarHeader.style';

const CalendarHeader = ({ currentMonth, scrollToPrevMonth, scrollToNextMonth, scrollToToday }) => {
  return (
    <>
      <TopContent>
        <Left>
          <Month>{moment(new Date(currentMonth)).format('MMMM')}</Month>
          <span>{currentMonth.getFullYear()}</span>
        </Left>
        <Right>
          <MoveButton onClick={scrollToPrevMonth}>
            <i className="fas fa-chevron-left"></i>
          </MoveButton>
          <TodayButton onClick={scrollToToday}>Today</TodayButton>
          <MoveButton onClick={scrollToNextMonth}>
            <i className="fas fa-chevron-right"></i>
          </MoveButton>
        </Right>
      </TopContent>
      <BottomContent>
        <DayCell>Sun</DayCell>
        <DayCell>Mon</DayCell>
        <DayCell>Tue</DayCell>
        <DayCell>Wed</DayCell>
        <DayCell>Thu</DayCell>
        <DayCell>Fri</DayCell>
        <DayCell>Sat</DayCell>
      </BottomContent>
    </>
  )
}

export default CalendarHeader;