import React from 'react';
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

const CalendarHeader = ({ currentMonth, scrollToToday }) => (
  <TopContent>
    <Left>
      <Month>{currentMonth.format('MMMM')}</Month>
      <span>{currentMonth.year()}</span>
    </Left>
    <Right>
      <TodayButton onClick={scrollToToday}>Today</TodayButton>
    </Right>
  </TopContent>
);

export default CalendarHeader;