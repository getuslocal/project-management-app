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
import { updateTicket } from '../../../../../redux/tickets/tickets.actions';
import { IssueColors } from '../../../../../shared/constants/issues'
import Icon from '../../../../../shared/components/Icon/Icon'
import moment from 'moment'
import queryString from 'query-string';
import EpicDetail from './EpicDetail/EpicDetail';
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
  members,
  boardWidth,
  project: { columns, columnOrder },
  ...props
}) => {
  const { _id: epicId, dateRange, summary, key: epicKey, createdAt, assigneeId } = epic;
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
    // Set epic bar width.
    const defaultEpicWidth = momentedEndDate.diff(momentedStartDate, 'days') * 50;
    setEpicWidth(defaultEpicWidth);
    // Calculate position of the epic bar.
    const startDate = moment().set({
      'year': momentedStartDate.year(),
      'month': momentedStartDate.month(),
      'date': momentedStartDate.date()
    });
    const firstDayOfCalendar = moment().subtract(1, 'years');
    // Get difference of days between start date and the beginning date of calendar.
    const firstXPostion = startDate.diff(firstDayOfCalendar, 'days') * 50;
    setDragProperties({ ...dragProperties, lastPosition: firstXPostion, currentPostion: firstXPostion })
  }, [])

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
    // Check if it is not dragged. If true, open issue detail modal.
    // @todo: Figure out what deltaX is refering to.
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

  const onLeftResizeDrag = (e, ui) => {
    // When epic length is minimul length, skip this time.
    if (epicWidth <= 50 && ui.deltaX > 0) return;
    // Change width of the epic bar based on how much scrolled.
    setEpicWidth(lastEpicWidth => lastEpicWidth - ui.deltaX);
    // Adjust the positoin of the epic bar.
    setDragProperties(prevState => ({
      ...prevState,
      lastPosition: prevState.currentPostion + ui.deltaX,
      currentPostion: prevState.currentPostion + ui.deltaX,
    }));
  };

  const onLeftResizeStop = (e, ui) => {
    const newPosition = ui.lastX;
    const difference = (newPosition - resizeProperties.lastLeftResizeX) / 50;
    const newStartDate = moment(dateRange.startDate).add(difference, 'days');
    const updateData = {
      field: 'dateRange',
      value: { ...dateRange, startDate: newStartDate }
    }
    updateTicket(epicId, updateData);
    setResizeProperties({ ...resizeProperties, lastLeftResizeX: newPosition });
  };

  const onRightResizeDrag = (e, ui) => {
    // When epic length is minimul length, skip this time.
    if (epicWidth <= 50 && ui.deltaX < 0) return;
    // Change width of the epic bar based on how much scrolled.
    setEpicWidth(lastEpicWidth => lastEpicWidth + ui.deltaX);
  };

  const onRightResizeStop = (e, ui) => {
    const newPosition = ui.lastX;
    const difference = (newPosition - resizeProperties.lastRightResizeX) / 50;
    const newEndDate = moment(dateRange.endDate).add(difference, 'days');
    const updateData = {
      field: 'dateRange',
      value: { ...dateRange, endDate: newEndDate }
    }
    updateTicket(epicId, updateData)
    setResizeProperties({ ...resizeProperties, lastRightResizeX: newPosition });
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

  const updateChildIssuesWithStatus = (childIssues) => {
    return childIssues.map(issue => {
      const currentColumn = Object.values(columns).find(column => column.taskIds.includes(issue._id));
      const isFirstColumn = (currentColumn && (currentColumn.id === columnOrder[0]));
      const isDone = (currentColumn && (currentColumn.id === columnOrder[columnOrder.length - 1]));
      return {
        ...issue,
        isFirstColumn: isFirstColumn,
        isDone: isDone,
        status: currentColumn.title
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
        childIssues={updateChildIssuesWithStatus(childIssues)}
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
            <Draggable
              axis="none"
              handle=".left-resize-bar"
              grid={[50, 50]}
              onDrag={onLeftResizeDrag}
              onStop={onLeftResizeStop}
              // Set offsetParent tp DraggableWrapper to prevent bugs.
              offsetParent={draggableWrapperRef.current}
            >
              <ResizeBar
                className="left-resize-bar"
                style={{ backgroundColor: epicColorProperty.light }}
              >
                <Icon type="grip-lines-vertical" size={10} isSolid={true} top={-1} />
              </ResizeBar>
            </Draggable>
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
            <Draggable
              axis="none"
              handle=".right-resize-bar"
              grid={[50, 50]}
              onDrag={onRightResizeDrag}
              onStop={onRightResizeStop}
            >
              <ResizeBar
                className="right-resize-bar"
                style={{ backgroundColor: epicColorProperty.light }}
              >
                <Icon type="grip-lines-vertical" size={10} isSolid={true} top={-1} />
              </ResizeBar>
            </Draggable>
          </EpicContainer>
        </Draggable>
        {
          isChildIssuesVisible && (
            <ChildIssueContainer
              style={{
                left: `calc(${dragProperties.currentPostion}px + 2px)`,
                width: `calc(${epicWidth}px - 2px)`
              }}>
              {updateChildIssuesWithStatus(childIssues).map(issue => {
                const assignee = members.find(member => member._id === issue.assigneeId)
                return (
                  <ChildIssue key={issue._id} onClick={() => openIssueDetailModal(issue.key)} style={{ backgroundColor: epicColorProperty.bg }}>
                    <Icon type="user-icon" imageUrl={assignee && assignee.pictureUrl} size={27} top={2} />
                    <ChildIssueSummary>
                      {issue.summary}
                      <Due>Due Tomorrow</Due>
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
  connect(mapStateToProps, { updateTicket })
)(EpicList);