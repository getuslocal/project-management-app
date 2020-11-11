import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import QuickIssueCreate from './QuickIssueCreate/QuickIssueCreate';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { compose } from 'redux';
import {
  Container,
  Content,
  Header,
  QuickAddButton,
  MonthName,
  Task,
  Summary
} from './DayCell.style';
import { selectIssuesOfDueDate } from '../../../../../../redux/tickets/tickets.selectors';
import { selectMembers } from '../../../../../../redux/members/members.selectors';
import Icon from '../../../../../../shared/components/Icon/Icon';

const DayCell = ({ momentDate, issues, members, ...props }) => {
  const [isContentActive, setIsContentActive] = useState(false);

  // Open this ticket detail modal when clicked.
  const openIssueDetailModal = (key) => {
    const stringified = queryString.stringify({ selectedIssue: key });
    props.history.push(`${props.match.url}?${stringified}`)
  }

  return (
    <Container>
      <Content
        className="day-cell"
        isToday={momentDate.isSame(moment(), 'day', 'month')}
        isFirstDay={(momentDate.format('D') == 1)}
      >
        <Header>
          <QuickAddButton
            className="icon-plus quick-add-button"
            onClick={() => { setIsContentActive(true) }}
          />
          <MonthName>{momentDate.format('D') == 1 && momentDate.format('MMMM')}</MonthName>
          {momentDate.format('D')}
        </Header>
        {
          issues.map(issue => {
            const member = members.find(member => member._id === issue.assigneeId);
            return (
              <Task key={issue._id} onClick={() => openIssueDetailModal(issue.key)}>
                {(issue.assigneeId && member) && (
                  <Icon type="user-icon" imageUrl={member.pictureUrl} size={24} top={2} />
                )}
                <Summary>{issue.summary}</Summary>
              </Task>
            )
          })
        }
        {isContentActive && <QuickIssueCreate momentDate={momentDate} setIsContentActive={() => setIsContentActive(false)} />}
      </Content>
    </Container>
  )
}

DayCell.propTypes = {
  momentDate: PropTypes.object.isRequired,
  issues: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  issues: selectIssuesOfDueDate(ownProps.momentDate),
  members: selectMembers
});

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(DayCell)