import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import moment from 'moment';
import { IssueColors } from '../../../../../../../../shared/constants/issues';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectEpicTickets } from '../../../../../../../../redux/tickets/tickets.selectors';
import queryString from 'query-string';
import {
  Task,
  Container
} from './CalendarTask.style';

const CalendarTask = ({
  epics,
  date: { yyyy, mm, dd },
  ...props
}) => {

  const openIssueDetailModal = (ticket) => {
    const stringified = queryString.stringify({ selectedIssue: ticket.key });
    props.history.push(`${props.match.url}?${stringified}`)
  }
  
  return (
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
                  openIssueDetailModal(epic)
                }}
              >
                {displaySummary && epic.summary}
              </Task>
            )
          )
        })
      }
    </Container>
  )
}

CalendarTask.propTypes = {
  epics: PropTypes.array.isRequired,
  date: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  epics: selectEpicTickets,
});

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(CalendarTask);