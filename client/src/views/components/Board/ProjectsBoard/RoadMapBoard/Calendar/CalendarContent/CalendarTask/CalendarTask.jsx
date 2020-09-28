import React, { useState } from 'react';
import moment from 'moment';
import { IssueColors } from '../../../../../../../../shared/constants/issues';
import Modal from '../../../../Modal/Modal';
import {
  Task,
  Container
} from './CalendarTask.style';

const CalendarTask = ({ epics, date: { yyyy, mm, dd } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEpic, setModalEpic] = useState(null);
  return (
    <>
      <Container className="calendarTaskContainer">
        {
          epics.map((epic) => {
            const issueColor = IssueColors[epic.issueColor.toUpperCase()]
            const { startDate, endDate } = epic.dateRange;
            const thisDate = moment([yyyy, mm, dd]);
            const isStartDate = thisDate.isSame(moment(startDate), 'day')
            const isBetween = thisDate.isBetween(moment(startDate), moment(endDate), 'day')
            const isEndDate = thisDate.isSame(moment(endDate), 'day')
            let isGhost;
            let displaySummary = false;

            if (thisDate.isAfter(moment(endDate)) && thisDate.isBefore((moment(endDate).weekday(6)))) {
              isGhost = true
            }

            if (thisDate.isAfter((moment(startDate).weekday(-1)), 'day') && thisDate.isBefore(moment(startDate), 'day')) {
              isGhost = true
            }

            if ((thisDate.day() === 0 || isStartDate) && !isGhost) {
              displaySummary = true;
            }

            return (
              ((isStartDate || isBetween || isEndDate || isGhost) &&
                <Task
                  key={epic.key}
                  isStartDate={isStartDate}
                  isEndDate={isEndDate}
                  isGhost={isGhost}
                  borderColor={issueColor.border}
                  style={{
                    backgroundColor: isGhost ? 'transparent' : issueColor.bg,
                    color: issueColor.font,
                  }}
                  onClick={() => {
                    if (isGhost) return
                    setIsModalOpen(true)
                    setModalEpic(epic)
                  }}
                >
                  {displaySummary && epic.summary}
                </Task>
              )
            )
          })
        }
      </Container>
      {/* Render Epic issue details modal */}
      {isModalOpen &&
        <Modal
          isEpicModalOpen={true}
          setIsModalOpen={setIsModalOpen}
          ticket={modalEpic}
        />
      }
    </>
  )
}

export default CalendarTask
