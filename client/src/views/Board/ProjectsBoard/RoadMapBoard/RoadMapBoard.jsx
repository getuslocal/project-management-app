import React, { useState, useEffect, Fragment, useRef } from 'react';
import TopBar from '../TopBar/TopBar';
import HorizontalCalendar from './HorizontalCalendar/HorizontalCalendar'
import EpicList from './EpicList/EpicList'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFilteredEpics } from '../../../../redux/tickets/tickets.selectors';
import PropTypes from 'prop-types';
import moment from 'moment';
import Icon from '../../../../shared/components/Icon/Icon';
import IssueCreate from '../Modal/IssueCreate/IssueCreate';
import { clearAllFilters } from '../../../../redux/tickets/tickets.actions';
import {
  Container,
  Left,
  TopLeftContent,
  Right,
  ViewButton,
  Option,
  TodayButton,
  ButtonWrapper,
  NewEpicButton
} from './RoadMapBoard.style'

const RoadMapBoard = ({ project, epics, clearAllFilters }) => {
  const todayCellRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    scrollToToday()
    // Clean up filters before unmounting.
    return () => { clearAllFilters() };
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
              {/* @TODO: temporary element. Uncomment the options once monthly view is created. */}
              <p>Epics</p>
              {/* <Option isActive={true}>Weeks</Option> */}
              {/* <Option>Months</Option> */}
            </ViewButton>
            <TodayButton onClick={scrollToToday}>Today</TodayButton>
          </TopLeftContent>
        </Left>
        <Right ref={scrollContainerRef}>
          <HorizontalCalendar todayCellRef={todayCellRef} />
          <div>
            {
              epics.map(epic => <EpicList key={epic._id} epic={epic} boardWidth={calculateBoardWidth()} />)
            }
            <ButtonWrapper
              style={{ width: `${calculateBoardWidth()}px` }}
              onClick={() => setIsModalOpen(true)}
            >
              <NewEpicButton><Icon type="plus" size={12} isSolid={true} />New Epic</NewEpicButton>
            </ButtonWrapper>
          </div>
        </Right>
      </Container>
      {isModalOpen && (
        <IssueCreate
          setIsModalOpen={setIsModalOpen}
          isEpic={true}
        />
      )}
    </Fragment>
  )
}

RoadMapBoard.propTypes = {
  project: PropTypes.object.isRequired,
  epics: PropTypes.array.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  epics: selectFilteredEpics,
})

export default connect(mapStateToProps, { clearAllFilters })(RoadMapBoard)