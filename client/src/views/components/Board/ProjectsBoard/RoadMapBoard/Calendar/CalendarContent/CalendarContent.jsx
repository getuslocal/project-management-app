import React, { useState } from 'react';
import moment from 'moment';
import CalendarTask from './CalendarTask/CalendarTask';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectEpicTickets } from '../../../../../../../redux/tickets/tickets.selectors';
import Modal from '../../../Modal/Modal';
import {
  Container,
  DayCell,
  Content,
  Week,
  Header,
  QuickAddButton
} from './CalendarContent.style';

const CalendarContent = ({
  containerRef,
  onScroll,
  calendar,
  currentMonthOfCalendar,
  getWeekCellRef,
  weekCellRef,
  epics,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultStartDate, setDefaultStartDate] = useState(null);

  return (
    <>
      <Container ref={containerRef} onScroll={onScroll}>
        {
          calendar.map((week, index) => {
            return (
              <Week key={index} ref={getWeekCellRef(week, weekCellRef)}>
                {
                  week.map((date) => {
                    const { yyyy, mm, dd } = date;
                    const isFocused = (currentMonthOfCalendar === mm);
                    const isToday = (moment(`${yyyy}-${mm + 1}-${dd}`).isSame(moment().format("YYYY-MM-DD")));
                    return (
                      <DayCell
                        key={`${yyyy}${mm}${dd}`}
                        isFocused={isFocused}
                        isToday={isToday}
                      >
                        <Content>
                          <Header isToday={isToday}>
                            {dd === 1 && moment(new Date(yyyy, mm)).format('MMM')} {dd}
                            <QuickAddButton className="icon-plus" onClick={() => {
                              setIsModalOpen(true)
                              setDefaultStartDate(moment(new Date(yyyy, mm, dd)))
                            }}>
                            </QuickAddButton>
                          </Header>
                          <CalendarTask epics={epics} date={date} />
                        </Content>
                      </DayCell>
                    );
                  })}
              </Week>
            )
          })
        }
      </Container>
      {isModalOpen &&
        <Modal
          isNewEpicModalOpen={true}
          setIsModalOpen={setIsModalOpen}
          defaultStartDate={defaultStartDate}
        />
      }
    </>
  )
}

CalendarContent.propTypes = {
  epics: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  epics: selectEpicTickets,
});

export default connect(mapStateToProps, null)(CalendarContent);