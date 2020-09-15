import React, { useState, useRef, useEffect } from 'react';
import './temp.css'
import TopBar from '../TopBar/TopBar';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import CalendarContent from './CalendarContent/CalendarContent';
import {
  Container,
} from './RoadMapBoard.style';

const RoadMapBoard = ({ project }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const todayRef = useRef(null);
  const today = {
    yyyy: new Date().getFullYear(),
    mm: new Date().getMonth(),
    dd: new Date().getDate(),
  }

  const changeMonth = (yyyy, mm) => {
    setCurrentMonth(new Date(yyyy, mm))
  }

  return (
    <Container>
        <TopBar project={project} renderStyle="RoadMapBoard" />
        {/* <CalendarHeader
          currentMonth={currentMonth}
          changeMonth={changeMonth}
          todayRef={todayRef}
          today={today}
        /> */}
        <CalendarContent
          today={today}
          currentMonth={currentMonth}
          changeMonth={changeMonth}
          todayRef={todayRef}
        />
    </Container>
  );
}


export default RoadMapBoard;