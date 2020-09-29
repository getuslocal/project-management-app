import React, { useState, Fragment } from 'react';
import moment from 'moment';
import CalendarTask from './CalendarTask/CalendarTask';
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
}) => {
  const [IssueCreateModalOpen, setIssueCreateModalOpen] = useState(false);
  const [IssueDetailModalOpen, setIssueDetailModalOpen] = useState(false);
  const [epic, setEpic] = useState(null);
  const [defaultStartDate, setDefaultStartDate] = useState(null);
  return (
    <Fragment>
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
                              setIssueCreateModalOpen(true)
                              setDefaultStartDate(moment(new Date(yyyy, mm, dd)))
                            }}>
                            </QuickAddButton>
                          </Header>
                          <CalendarTask date={date} setIssueDetailModalOpen={setIssueDetailModalOpen} setEpic={setEpic} />
                        </Content>
                      </DayCell>
                    );
                  })}
              </Week>
            )
          })
        }
      </Container>
      {IssueCreateModalOpen &&
        <Modal
          isNewEpicModalOpen={true}
          setIsModalOpen={setIssueCreateModalOpen}
          defaultStartDate={defaultStartDate}
        />
      }
      {IssueDetailModalOpen &&
        <Modal
          isEpicModalOpen={true}
          setIsModalOpen={setIssueDetailModalOpen}
          ticket={epic}
        />
      }
    </Fragment>
  )
}


export default CalendarContent;