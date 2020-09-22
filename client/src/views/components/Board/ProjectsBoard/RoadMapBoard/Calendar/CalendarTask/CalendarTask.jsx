import React from 'react';
import moment from 'moment';
import { IssueColors } from '../../../../../../../shared/constants/issues';
import {
  Task,
  Container
} from './CalendarTask.style';

const CalendarTask = ({ epics, date: { yyyy, mm, dd }, setIsModalOpen }) => {
  return (
    <Container>
      {
        epics.map(epic => {
          const issueColor = IssueColors[epic.issueColor.toUpperCase()]
          const { startDate, endDate } = epic.dateRange;
          const thisDate = moment([yyyy, mm, dd]);
          const isStartDate = thisDate.isSame(moment(startDate), 'day')
          const isBetween = thisDate.isBetween(moment(startDate), moment(endDate), 'day')
          const isEndDate = thisDate.isSame(moment(endDate), 'day')
          // const epicLength = moment(endDate).diff(moment(startDate), 'days') + 1; // 6 + 1 = 7
          const startDayOfWeek = moment(startDate).day(); // 0 - 6. ie:  4
          let multiplication = 1;
          let displayTask = false;

          if (isStartDate) {
            const span = moment(endDate).diff(moment(startDate), 'days');
            // console.log('span : ' + span)
            if (span <= 6) {
              multiplication = (7 - startDayOfWeek) - (6 - span);
            } else {
              multiplication = (7 - startDayOfWeek);
            }
            // console.log('multiplication : ' + multiplication)
            displayTask = true;
          } else if ((isBetween || isEndDate) && thisDate.day() === 0) {
            // @todo: Test this logic.
            const dif = moment(endDate).diff(thisDate, 'days');
            if (dif >= 7) {
              multiplication = 7
            } else {
              multiplication = dif + 1; // 4
            }
            displayTask = true;
          }

          return (
            <div key={epic.key}>
              {
                (displayTask &&
                  <Task
                    isStartDate={isStartDate}
                    borderColor={issueColor.border}
                    style={{
                      backgroundColor: issueColor.bg,
                      color: issueColor.font,
                      width: `calc(${100 * multiplication}% + ${2 * (multiplication - 1)}px - ${isStartDate ? 5 : 0}px)`
                    }}
                    onClick={() => setIsModalOpen(epic)}
                  >
                    {epic.summary}
                  </Task>
                )
              }
            </div>
          )
        })
      }
    </Container>

  )
}

export default CalendarTask
