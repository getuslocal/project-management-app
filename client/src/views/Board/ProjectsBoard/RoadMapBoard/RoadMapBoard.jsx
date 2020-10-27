import React, { useState, useEffect, Fragment, useRef } from 'react';
import TopBar from '../TopBar/TopBar';
import HorizontalCalendar from './HorizontalCalendar/HorizontalCalendar'
import EpicList from './EpicList/EpicList'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEpicTickets } from '../../../../redux/tickets/tickets.selectors';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Container,
  Left,
  TopLeftContent,
  TopText,
  Right,
  ViewButton,
  Option,
  TodayButton
} from './RoadMapBoard.style'

const RoadMapBoard = ({ project, epics }) => {
  const todayCellRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [boardHeight, setBoardHeight] = useState(0)

  useEffect(() => {
    scrollToToday()
    setBoardHeight(containerRef.current.offsetHeight)
  }, [])

  const scrollToToday = () => {
    const todayCellPosX = todayCellRef.current.offsetLeft;
    const offset = 50;
    scrollContainerRef.current.scrollTo(todayCellPosX - offset, 0);
  }

  const calculateBoardWidth = () => {
    const dateStart = moment().subtract(1, 'years');
    const dateEnd = moment().add(1, 'years');
    const diff = dateEnd.diff(dateStart, 'days');
    return diff * 50;
  }

  return (
    <Fragment>
      <TopBar project={project} isEpicModal={true} />
      <Container ref={containerRef}>
        <Left>
          <TopLeftContent>
            <ViewButton>
              <Option isActive={true}>Weeks</Option>
              <Option>Months</Option>
            </ViewButton>
            <TodayButton onClick={scrollToToday}>Today</TodayButton>
          </TopLeftContent>
        </Left>
        <Right ref={scrollContainerRef} style={{ minHeight: `calc(${boardHeight}px - 4px)` }}>
          <HorizontalCalendar todayCellRef={todayCellRef} />
          <div>
            {
              epics.map(epic => <EpicList key={epic._id} epic={epic} boardWidth={calculateBoardWidth()} />)
            }
          </div>
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