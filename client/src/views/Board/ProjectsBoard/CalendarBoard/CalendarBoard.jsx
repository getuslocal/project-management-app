import React from 'react';
import TopBar from '../TopBar/TopBar';
import Calendar from './Calendar/Calendar';
import {
  Container,
} from './CalendarBoard.style';

const CalendarBoard = ({ project }) => {
  return (
    <Container>
        <TopBar project={project} isEpicModal={true} />
        <Calendar />
    </Container>
  );
}

export default CalendarBoard;