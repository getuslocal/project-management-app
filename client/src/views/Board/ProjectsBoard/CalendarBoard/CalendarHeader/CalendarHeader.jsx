import React from 'react';
import Button from '../../../../../shared/components/Button/Button'
import Icon from '../../../../../shared/components/Icon/Icon';
import {
  TopContent,
  Left,
  Month,
  Right,
} from './CalendarHeader.style';

const CalendarHeader = ({ currentMonth, scrollToToday, scrollToPrevMonth, scrollToNextMonth }) => (
  <TopContent>
    <Left>
      <Month>{currentMonth.format('MMMM')}</Month>
      <span>{currentMonth.year()}</span>
    </Left>
    <Right>
      <Button
        className="angle-button"
        variant="primary"
        onClick={scrollToPrevMonth}
      >
        <Icon type="angle-left" isSolid={true} size={18} top={2} />
      </Button>
      <Button className="today-button" text="Today" variant="primary" onClick={scrollToToday} />
      <Button
        className="angle-button"
        variant="primary"
        onClick={scrollToNextMonth}
      >
        <Icon type="angle-right" isSolid={true} size={18} top={2} />
      </Button>
    </Right>
  </TopContent>
);

export default CalendarHeader;