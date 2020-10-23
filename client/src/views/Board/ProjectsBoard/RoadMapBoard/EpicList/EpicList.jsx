import React, { useState, useEffect, Fragment } from 'react'
import Draggable from 'react-draggable'; // The default
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectChildIssues } from '../../../../../redux/tickets/tickets.selectors';
import { selectMembers } from '../../../../../redux/members/members.selectors';
import { updateTicket } from '../../../../../redux/tickets/tickets.actions';
import { IssueColors } from '../../../../../shared/constants/issues'
import Icon from '../../../../../shared/components/Icon/Icon'
import moment from 'moment'
import {
  TaskDetail,
  Row,
  Opener,
  EpicTitle,
  Epic,
  EpicContainer,
  DraggableWrapper,
  Progress,
  Summary,
  ChildIssue,
  ChilsIssueSummary,
  Due
} from './EpicList.style'

const EpicList = ({ epic, childIssues, updateTicket, members }) => {
  const { _id: epicId, dateRange, summary, key, createdAt, assigneeId } = epic;
  const epicColorProperty = IssueColors[epic.issueColor.toUpperCase()];
  const [defaltPos, setDefaultPos] = useState(null);
  const [dragProperties, setDragProperties] = useState({
    activeDrags: 0,
    lastPosition: 0
  })

  useEffect(() => {
    // Get default position
    const momentedStartDate = moment(dateRange.startDate)
    const startDate = moment().set({
      'year': momentedStartDate.year(),
      'month': momentedStartDate.month(),
      'date': momentedStartDate.date()
    });
    const firstDayOfCalendar = moment().subtract(1, 'years');
    // Get difference of days between start date and the beginning date of calendar.
    const translateXValue = startDate.diff(firstDayOfCalendar, 'days') * 50;
    setDefaultPos(translateXValue)
    setDragProperties({ ...dragProperties, lastPosition: translateXValue })
  }, [])

  const onStart = () => {
    setDragProperties({ ...dragProperties, activeDrags: ++dragProperties.activeDrags });
  };

  const handleDateChange = (difference) => {
    const newStartDate = moment(dateRange.startDate).add(difference, 'days');
    const newEndDate = moment(dateRange.endDate).add(difference, 'days');
    const updateData = {
      field: 'dateRange',
      value: { endDate: newEndDate, startDate: newStartDate }
    }
    updateTicket(epicId, updateData)
    // @todo: Handles history updates after the above.
  }

  const onStop = (e, ui) => {
    const newPosition = ui.lastX;
    const difference = (newPosition - dragProperties.lastPosition) / 50;
    handleDateChange(difference)
    setDragProperties({ ...dragProperties, activeDrags: --dragProperties.activeDrags, lastPosition: ui.lastX });
  };

  const getWidth = () => {
    return moment(dateRange.endDate).diff(moment(dateRange.startDate), 'days') * 50;
  }

  return (
    <Row key={epic._id}>
      <TaskDetail backgroundColor={epicColorProperty.bg} style={{
        height: `${childIssues.length * 50 + 70}px`
      }}>
        <Opener backgroundColor={epicColorProperty.border}><Icon type="plus" size={10} isSolid={true} /></Opener>
        <EpicTitle>{epic.summary}</EpicTitle>
      </TaskDetail >
      {
        defaltPos !== null && (
          <DraggableWrapper>
            <Draggable
              axis="x"
              handle=".epic"
              bounds="parent"
              defaultPosition={{ x: defaltPos, y: 0 }}
              grid={[50, 50]}
              onStart={onStart}
              onStop={onStop}
            >
              <EpicContainer width={getWidth()}>
                <Epic
                  className="epic"
                  progressColor={epicColorProperty.border}
                  progress={30}
                  style={{
                    backgroundColor: epicColorProperty.bg,
                    color: epicColorProperty.font
                  }}
                >
                  <Summary>{summary}</Summary>
                  <Progress>30%</Progress>
                </Epic>
                {
                  childIssues.map(issue => {
                    const asignee = members.find(member => member._id === issue.assigneeId)
                    return (
                      <ChildIssue key={issue._id}>
                        <Icon type="user-icon" imageUrl={asignee && asignee.pictureUrl} size={26} top={2} />
                        <ChilsIssueSummary>
                          {issue.summary}
                          <Due>Due tomorrow</Due>
                        </ChilsIssueSummary>
                      </ChildIssue>
                    )
                  })
                }
              </EpicContainer>
            </Draggable>
          </DraggableWrapper>
        )
      }
    </Row>
  )
}

EpicList.propTypes = {
  epic: PropTypes.object.isRequired,
  childIssues: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
  updateTicket: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  childIssues: selectChildIssues(ownProps.epic._id),
  members: selectMembers
})

export default connect(mapStateToProps, { updateTicket })(EpicList)
