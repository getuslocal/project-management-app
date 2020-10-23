import React, { useEffect, Fragment, useRef } from 'react';
import TopBar from '../TopBar/TopBar';
import HorizontalCalendar from './HorizontalCalendar/HorizontalCalendar'
import EpicList from './EpicList/EpicList'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEpicTickets } from '../../../../redux/tickets/tickets.selectors';
import PropTypes from 'prop-types';
import {
  Container,
  Left,
  TopText,
  Right
} from './RoadMapBoard.style'

const RoadMapBoard = ({ project, epics }) => {
  const todayCellRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    scrollToToday()
  }, [])

  const scrollToToday = () => {
    const todayCellPosX = todayCellRef.current.offsetLeft;
    const offset = 50;
    scrollContainerRef.current.scrollTo(todayCellPosX - offset, 0);
  }

  return (
    <Fragment>
      <TopBar project={project} isEpicModal={true} />
      {/* <button onClick={scrollToToday}>Today</button> */}
      <Container>
        <Left>
          <TopText>{`Epic`}<span>3 total</span></TopText>
        </Left>
        <Right ref={scrollContainerRef}>
          <HorizontalCalendar todayCellRef={todayCellRef} />
          {
            epics.map(epic => <EpicList key={epic._id} epic={epic} />)
          }
        </Right>
      </Container>
    </Fragment>
  )
}

RoadMapBoard.propTypes = {
  project: PropTypes.object.isRequired,
  epics: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  epics: selectEpicTickets,
})

export default connect(mapStateToProps, null)(RoadMapBoard)