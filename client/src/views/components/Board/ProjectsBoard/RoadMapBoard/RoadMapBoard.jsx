import React from 'react';
import TopBar from '../TopBar/TopBar';
import Calendar from './Calendar/Calendar';
import {
  Container,
} from './RoadMapBoard.style';

const RoadMapBoard = ({ project }) => {

  return (
    <Container>
        <TopBar project={project} renderStyle="RoadMapBoard" />
        <Calendar />
    </Container>
  );
}

export default RoadMapBoard;