import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Draggable from 'react-draggable';
import { ResizeBar } from '../EpicList.style';
import Icon from '../../../../../../shared/components/Icon/Icon';
import {
  IssueHistoryTypes,
  IssueTypes,
} from '../../../../../../shared/constants/issues';

const LeftResizableBar = ({
  epic: { _id: epicId, key: epicKey, summary },
  projectId,
  epicWidth,
  setEpicWidth,
  setDragProperties,
  dateRange,
  resizeProperties,
  setResizeProperties,
  updateTicket,
  updateHistory,
  epicColorProperty,
  draggableWrapperRef,
}) => {
  const onResizeDrag = (e, ui) => {
    // When epic length is minimum length, skip.
    if (epicWidth <= 50 && ui.deltaX > 0) return;
    // Change width of the epic bar based on how much scrolled.
    setEpicWidth((lastEpicWidth) => lastEpicWidth - ui.deltaX);
    // Adjust the positoin of the epic bar.
    setDragProperties((prevState) => ({
      ...prevState,
      lastPosition: prevState.currentPostion + ui.deltaX,
      currentPostion: prevState.currentPostion + ui.deltaX,
    }));
  };

  const onResizeStop = (e, ui) => {
    const newPosition = ui.lastX;
    const { startDate, endDate } = dateRange;
    const difference = (newPosition - resizeProperties.lastLeftResizeX) / 50;
    const newStartDate = moment(startDate).add(difference, 'days');
    const isBeforeEndDate = newStartDate.isBefore(moment(endDate), 'days');
    const prevDayOfEndDate = moment(endDate).subtract(1, 'days');

    // Check if there's no difference.
    if (difference === 0) {
      return;
    }
    // Check if it's resized beyond the end date and current start date is
    // the prev day of end date.
    else if (
      !isBeforeEndDate &&
      moment(startDate).isSame(prevDayOfEndDate, 'days')
    ) {
      // Update resize properties with the new position.
      setResizeProperties({
        ...resizeProperties,
        lastLeftResizeX: newPosition,
      });
      return;
    } else {
      // Prepare values for epic update.
      const updateData = {
        field: 'dateRange',
        value: { ...dateRange, startDate: newStartDate },
      };

      // Prepare values for history update.
      const logData = {
        ticket: {
          id: epicId,
          displayValue: `${epicKey}: ${summary}`,
          type: IssueTypes.EPIC,
        },
        type: IssueHistoryTypes.UPDATE,
        field: 'Start date',
        before: moment(startDate).format('LL'),
        after: newStartDate.format('LL'),
      };

      // Update resize properties with the new position.
      setResizeProperties({
        ...resizeProperties,
        lastLeftResizeX: newPosition,
      });

      // If new start date is not before the end date, set the previous day of the end date.
      if (!isBeforeEndDate) {
        updateData.value.startDate = prevDayOfEndDate;
        logData.after = prevDayOfEndDate.format('LL');
      }
      // Update epic data on db.
      updateTicket(epicId, updateData);
      // Handles history updates.
      updateHistory(projectId, logData);
    }
  };

  return (
    <Draggable
      axis="none"
      handle=".left-resize-bar"
      grid={[50, 50]}
      onDrag={onResizeDrag}
      onStop={onResizeStop}
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
  );
};

LeftResizableBar.propTypes = {};

export default LeftResizableBar;
