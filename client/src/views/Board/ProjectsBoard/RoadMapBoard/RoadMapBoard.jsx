import React, { useEffect, Fragment, useRef } from 'react';
import TopBar from '../TopBar/TopBar';
import HorizontalCalendar from './HorizontalCalendar/HorizontalCalendar'
import EpicLists from './EpicLists/EpicLists'
import {
  Container,
  Left,
  Right
} from './RoadMapBoard.style'

const RoadMapBoard = ({ project }) => {
  const todayCellRef = useRef(null);

  useEffect(() => {
    scrollToToday()
  }, [])


  const scrollToToday = () => {
    console.log(todayCellRef.current.offsetLeft)
    todayCellRef.current.scrollIntoView({ inline: 'start' });
  }

  return (
    <Fragment>
      <TopBar project={project} isEpicModal={true} />
      <button onClick={scrollToToday}>Today</button>
      <Container>
        <Left>
          <p>Epic (4)</p>
        </Left>
        <Right >
          <HorizontalCalendar todayCellRef={todayCellRef} />
          <EpicLists />
        </Right>
      </Container>
    </Fragment>
  )
}

export default RoadMapBoard