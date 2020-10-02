import React, { useState, Fragment } from 'react';
import moment from 'moment';
import CalendarTask from './CalendarTask/CalendarTask';
import IssueCreateEpic from '../../../Modal/IssueCreate/IssueCreateEpic';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
                              setIsModalOpen(true)
                              setDefaultStartDate(moment(new Date(yyyy, mm, dd)))
                            }}>
                            </QuickAddButton>
                          </Header>
                          <CalendarTask date={date} setIsModalOpen={setIsModalOpen} />
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
        <IssueCreateEpic
          setIsModalOpen={setIsModalOpen}
          defaultStartDate={defaultStartDate}
        />
      }
    </Fragment>
  )
}


export default CalendarContent;