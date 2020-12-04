import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Draggable from 'react-draggable';
import {
  ResizeBar,
} from '../EpicList.style'
import Icon from '../../../../../../shared/components/Icon/Icon';
import { IssueHistoryTypes, IssueTypes } from '../../../../../../shared/constants/issues';

const RightResizableBar = ({
  epic,
  projectId,
  epicWidth,
  setEpicWidth,
  dateRange,
  resizeProperties,
  setResizeProperties,
  updateTicket,
  updateHistory,
  epicColorProperty
}) => {

  const onResizeDrag = (e, ui) => {
    // When epic length is minimum length, skip.
    if (epicWidth <= 50 && ui.deltaX < 0) return;
    // Change width of the epic bar based on how much scrolled.
    setEpicWidth(lastEpicWidth => lastEpicWidth + ui.deltaX);
  };

  const onResizeStop = (e, ui) => {
    const newPosition = ui.lastX;
    const { startDate, endDate } = dateRange;
    const difference = (newPosition - resizeProperties.lastRightResizeX) / 50;
    const newEndDate = moment(endDate).add(difference, 'days');
    const isAfterStartDate = newEndDate.isAfter(moment(startDate), 'days');
    const nextDayOfStartDate = moment(startDate).add(1, 'days');

    // Check if there's no difference.
    if (difference === 0) {
      return
    }
    // Check if it's resized beyond the start date and current end date is 
    // the next day of start date.
    else if (!isAfterStartDate && moment(endDate).isSame(nextDayOfStartDate, 'days')) {
      // Update resize properties with the new position.
      setResizeProperties({ ...resizeProperties, lastRightResizeX: newPosition });
      return
    }
    else {
      // Prepare values for epic update.
      const updateData = {
        field: 'dateRange',
        value: { ...dateRange, endDate: newEndDate }
      }

      // Prepare values for history update.
      const logData = {
        ticket: {
          id: epic._id,
          displayValue: `${epic.key}: ${epic.summary}`,
          type: IssueTypes.EPIC,
        },
        type: IssueHistoryTypes.UPDATE,
        field: 'Due date',
        before: moment(endDate).format('LL'),
        after: newEndDate.format('LL'),
      };

      // Update resize properties with the new position.
      setResizeProperties({ ...resizeProperties, lastRightResizeX: newPosition });

      // If new end date is not after the start date, set the next day of the start date.
      if (!isAfterStartDate) {
        updateData.value.endDate = nextDayOfStartDate;
        logData.after = nextDayOfStartDate.format('LL');
      };
      // Update epic data on db.
      updateTicket(epic._id, updateData);
      // Handles history updates.
      updateHistory(projectId, logData);
    }
  };

  return (
    <Draggable
      axis="none"
      handle=".right-resize-bar"
      grid={[50, 50]}
      onDrag={onResizeDrag}
      onStop={onResizeStop}
    >
      <ResizeBar
        className="right-resize-bar"
        style={{ backgroundColor: epicColorProperty.light }}
      >
        <Icon type="grip-lines-vertical" size={10} isSolid={true} top={-1} />
      </ResizeBar>
    </Draggable>
  )
}

RightResizableBar.propTypes = {

}

export default RightResizableBar
