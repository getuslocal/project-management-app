import React, { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'; // The default
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectChildIssues } from '../../../../../redux/tickets/tickets.selectors';
import { selectCurrentProject } from '../../../../../redux/projects/projects.selectors';
import { selectMembers } from '../../../../../redux/members/members.selectors';
import { updateHistory } from '../../../../../redux/projects/projects.actions';
import { updateTicket } from '../../../../../redux/tickets/tickets.actions';
import { IssueColors, IssueHistoryTypes, IssueTypes } from '../../../../../shared/constants/issues'
import Icon from '../../../../../shared/components/Icon/Icon'
import moment from 'moment'
import queryString from 'query-string';
import EpicDetail from './EpicDetail/EpicDetail';
import RightResizableBar from './RightResizableBar/RightResizableBar';
import LeftResizableBar from './LeftResizableBar/LeftResizableBar';
import {
  Row,
  Epic,
  EpicContainer,
  DraggableWrapper,
  Summary,
  ChildIssueContainer,
  ChildIssue,
  ChildIssueSummary,
  Due,
  Status,
  ResizeBar,
} from './EpicList.style'

const EpicList = ({
  epic,
  childIssues,
  updateTicket,
  updateHistory,
  members,
  boardWidth,
  project: { columns, columnOrder, _id: projectId },
  ...props
}) => {
  const { _id: epicId, dateRange, summary, key: epicKey } = epic;

  const epicColorProperty = IssueColors[epic.issueColor.toUpperCase()];

  const [dragProperties, setDragProperties] = useState({
    lastPosition: 0,
    currentPostion: 0,
  });

  const [resizeProperties, setResizeProperties] = useState({
    lastLeftResizeX: 0,
    lastRightResizeX: 0,
  });

  const [isChildIssuesVisible, setIsChildIssuesVisible] = useState(false);
  const [epicWidth, setEpicWidth] = useState(0);
  const draggableWrapperRef = useRef(null);

  // Get default position of Epic Bar
  useEffect(() => {
    const momentedStartDate = moment(dateRange.startDate);
    const momentedEndDate = moment(dateRange.endDate);
    const epicWidth = momentedEndDate.diff(momentedStartDate, 'days') * 50;

    // Set epic bar width.
    setEpicWidth(epicWidth);

    // Moment diff() does not always return the correct value, 
    // so use js Date() object instead.
    const formattedStartDate = moment(momentedStartDate).toDate();
    const calendarFirstDate = moment().subtract(1, 'years').toDate();

    // Calculate the time difference of two dates.
    const timeDiff = formattedStartDate.setHours(0, 0, 0, 0) - calendarFirstDate.setHours(0, 0, 0, 0);
    
    // Calculate the no. of days between two dates.
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Calculate transform x value.
    const firstXPostion = daysDiff * 50;

    setDragProperties({
      ...dragProperties,
      lastPosition: firstXPostion,
      currentPostion: firstXPostion
    })
  }, [dateRange])

  const handleDateChange = (difference) => {
    const newStartDate = moment(dateRange.startDate).add(difference, 'days');
    const newEndDate = moment(dateRange.endDate).add(difference, 'days');
    const updateData = {
      field: 'dateRange',
      value: { endDate: newEndDate, startDate: newStartDate }
    }
    updateTicket(epicId, updateData)
    // Handles history updates.
    const logData = {
      ticket: {
        id: epicId,
        displayValue: `${epicKey}: ${summary}`,
        type: IssueTypes.EPIC,
      },
      type: IssueHistoryTypes.UPDATE,
      field: 'Due date',
      before: moment(dateRange.endDate).format('LL'),
      after: newEndDate.format('LL'),
    }
    updateHistory(projectId, logData);
  }

  const onStop = (e, ui) => {
    const newPosition = ui.lastX;
    // Check if it is not dragged. If true, open issue detail modal.
    if (dragProperties.lastPosition === newPosition && ui.deltaX === 0) {
      openIssueDetailModal(epicKey)
      return;
    }
    // Get difference between new position and last position.
    const difference = (newPosition - dragProperties.lastPosition) / 50;
    // Update the epic start date and due date based on the diference.
    handleDateChange(difference);
    // Update drag properties.
    setDragProperties({
      ...dragProperties,
      lastPosition: newPosition,
      currentPostion: newPosition,
    });
  };

  const openIssueDetailModal = (key) => {
    const stringified = queryString.stringify({ selectedIssue: key });
    props.history.push(`${props.match.url}?${stringified}`)
  }

  const calculateTaskDetailHeight = () => {
    if (!isChildIssuesVisible) return 75;
    const baseHeight = 75;
    const childIssueHeight = (childIssues.length > 0 ? childIssues.length * 50 : 50);
    return childIssueHeight + baseHeight;
  }

  const updateChildIssuesWithStatus = (columns, childIssues) => {
    return childIssues.map(issue => {
      const columnData = columns[issue.columnId];
      const isFirstColumn = (columnData && (columnData.id === columnOrder[0]));
      const isDone = (columnData && (columnData.isDoneColumn));
      return {
        ...issue,
        isFirstColumn: isFirstColumn,
        isDone: isDone,
        status: columnData.title
      }
    })
  }

  return (
    <Row
      key={epic._id}
      style={{ height: `${calculateTaskDetailHeight()}px`, width: `${boardWidth}px` }}
    >
      {/* Left Part of the row */}
      <EpicDetail
        epicColorProperty={epicColorProperty}
        isChildIssuesVisible={isChildIssuesVisible}
        setIsChildIssuesVisible={setIsChildIssuesVisible}
        openIssueDetailModal={openIssueDetailModal}
        epic={epic}
        childIssues={updateChildIssuesWithStatus(columns, childIssues)}
        members={members}
      />
      {/* Right part of the Row */}
      <DraggableWrapper className="draggable-wrapper" ref={draggableWrapperRef}>
        <Draggable
          axis="x"
          handle=".epic"
          bounds="parent"
          grid={[50, 50]}
          position={{ x: dragProperties.currentPostion, y: 0 }}
          onStop={onStop}
        >
          <EpicContainer epicWidth={epicWidth} >
            <LeftResizableBar
              epic={epic}
              projectId={projectId}
              epicWidth={epicWidth}
              setDragProperties={setDragProperties}
              setEpicWidth={setEpicWidth}
              dateRange={dateRange}
              resizeProperties={resizeProperties}
              setResizeProperties={setResizeProperties}
              updateTicket={updateTicket}
              updateHistory={updateHistory}
              epicColorProperty={epicColorProperty}
              draggableWrapperRef={draggableWrapperRef}
            />
            <Epic
              className="epic"
              progressColor={epicColorProperty.border}
              isChildIssuesVisible={isChildIssuesVisible}
              progress={30}
              style={{
                backgroundColor: epicColorProperty.border,
              }}
            >
              <Summary>{summary}</Summary>
            </Epic>
            <RightResizableBar
              epic={epic}
              projectId={projectId}
              epicWidth={epicWidth}
              setEpicWidth={setEpicWidth}
              dateRange={dateRange}
              resizeProperties={resizeProperties}
              setResizeProperties={setResizeProperties}
              updateTicket={updateTicket}
              updateHistory={updateHistory}
              epicColorProperty={epicColorProperty}
            />
          </EpicContainer>
        </Draggable>
        {
          isChildIssuesVisible && (
            <ChildIssueContainer
              style={{
                left: `calc(${dragProperties.currentPostion}px + 2px)`,
                width: `calc(${epicWidth}px - 2px)`
              }}>
              {updateChildIssuesWithStatus(columns, childIssues).map(issue => {
                const assignee = members.find(member => member._id === issue.assigneeId)
                return (
                  <ChildIssue key={issue._id} onClick={() => openIssueDetailModal(issue.key)} style={{ backgroundColor: epicColorProperty.bg }}>
                    <Icon type="user-icon" className={assignee ? "" : "unassigned-icon"} imageUrl={assignee && assignee.pictureUrl} size={27} top={2} />
                    <ChildIssueSummary>
                      {issue.summary}
                      {/* <Due>Due Tomorrow</Due> */}
                    </ChildIssueSummary>
                    {
                      issue.status && <Status isFirstColumn={issue.isFirstColumn} isDone={issue.isDone}>{issue.status}</Status>
                    }
                  </ChildIssue>
                )
              })}
            </ChildIssueContainer>
          )
        }
      </DraggableWrapper>
    </Row >
  )
}

EpicList.propTypes = {
  epic: PropTypes.object.isRequired,
  childIssues: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
  updateTicket: PropTypes.func.isRequired,
  project: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  childIssues: selectChildIssues(ownProps.epic._id),
  members: selectMembers,
  project: selectCurrentProject
})

export default compose(
  withRouter,
  connect(mapStateToProps, { updateTicket, updateHistory })
)(EpicList);