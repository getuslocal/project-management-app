import React, { useState, useRef, useEffect } from 'react';
import './temp.css'
import TopBar from '../TopBar/TopBar';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import CalendarContent from './CalendarContent/CalendarContent';
import {
  FixedContent,
  Container,
  MainContent
} from './RoadMapBoard.style';

const RoadMapBoard = ({ project, isNavigationVisible }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [fixedContentHeight, setFixedContentHeight] = useState(null)
  const todayRef = useRef(null);
  const fixedContentRef = useRef(null);
  const currentDate = {
    yyyy: new Date().getFullYear(),
    mm: new Date().getMonth(),
    dd: new Date().getDate(),
  }

  useEffect(() => {
    const fixedContentHeight = fixedContentRef.current.clientHeight;
    setFixedContentHeight(fixedContentHeight);
    // console.log('RoadMapBoard')
    // todayRef.current.scrollIntoView(true);
  }, []);

  const changeMonth = (yyyy, mm) => {
    setCurrentMonth(new Date(yyyy, mm))
  }

  return (
    <Container>
      <FixedContent ref={fixedContentRef} isNavigationVisible={isNavigationVisible}>
        <TopBar project={project} renderStyle="RoadMapBoard" />
        <CalendarHeader
          currentMonth={currentMonth}
          changeMonth={changeMonth}
          todayRef={todayRef}
          currentDate={currentDate}
        />
      </FixedContent>
      <MainContent fixedContentHeight={fixedContentHeight} isNavigationVisible={isNavigationVisible}>
        <CalendarContent
          currentDate={currentDate}
          currentMonth={currentMonth}
          changeMonth={changeMonth}
          todayRef={todayRef}
        />
      </MainContent>
    </Container>
  );
}


export default RoadMapBoard;