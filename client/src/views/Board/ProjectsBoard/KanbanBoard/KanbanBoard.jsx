import React, { Fragment, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { updateOneColumnTicketsOrder, updateTwoColumnsTicketsOrder, updateColumnOrder, updateHistory } from '../../../../redux/projects/projects.actions';
import { selectFilteredTickets } from '../../../../redux/tickets/tickets.selectors';
import { clearAllFilters, updateTicket } from '../../../../redux/tickets/tickets.actions';
import Column from './Column/Column';
import ColumnCreate from './Column/ColumnCreate'
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { IssueHistoryTypes } from '../../../../shared/constants/issues';
import {
  Container,
  BoardContainer,
  NewColumnButton,
  NewColumnWrapper
} from './KanbanBoard.style';
import TopBar from '../TopBar/TopBar';
import Icon from '../../../../shared/components/Icon/Icon';
import { setAlert } from '../../../../redux/alert/alert.actions';

const getTickets = (ticketMap, taskIds) => {
  let selectedTickets = [];
  taskIds.forEach(taskId => {
    ticketMap.forEach(ticket => {
      if (ticket._id === taskId) {
        selectedTickets.push(ticket)
      }
    })
  })
  return selectedTickets
}

const InnerList = React.memo(props => {
  const { column, ticketMap, ...restProps } = props;
  return <Column column={column} tickets={getTickets(ticketMap, column.taskIds)} {...restProps} />
})

const KanbanBoard = ({
  project,
  tickets,
  clearAllFilters,
  updateColumnOrder,
  updateOneColumnTicketsOrder,
  updateTwoColumnsTicketsOrder,
  updateTicket,
  updateHistory,
  setAlert
}) => {
  const { columnOrder, columns, _id: projectId } = project;
  // console.log('KanbanBoard render')
  const [addColumnActive, setAddColumnActive] = useState(false);

  useEffect(() => {
    // Clean up filters before unmounting.
    return () => { clearAllFilters() };
  }, [])

  // Update history of the project.
  const updateHistoryOfProject = (ticketId, beforeColumnId, afterColumnId) => {
    const ticketData = tickets.find(ticket => ticket._id === ticketId);
    const logData = {
      ticket: {
        id: ticketId,
        displayValue: `${ticketData.key}: ${ticketData.summary}`,
        type: ticketData.issueType,
      },
      type: IssueHistoryTypes.UPDATE,
      field: 'Status',
      before: columns[beforeColumnId].title,
      after: columns[afterColumnId].title,
    }
    updateHistory(projectId, logData)
  }

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the type of dnd is column order change.
    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      // Update columnOrder field.
      updateColumnOrder(projectId, newColumnOrder);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // Moving within the column.
    if (start === finish) {
      const newTicketsIds = Array.from(start.taskIds);
      newTicketsIds.splice(source.index, 1);
      newTicketsIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTicketsIds,
      };
      // Update column taskIds field.
      updateOneColumnTicketsOrder(projectId, newColumn);
      return;
    }

    // Moving form one column to another.
    const startTicketsId = Array.from(start.taskIds);
    startTicketsId.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTicketsId,
    };

    const finishTicketsId = Array.from(finish.taskIds);
    finishTicketsId.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTicketsId,
    };
    // Update columnId field of the ticket.
    updateTicket(draggableId, { field: 'columnId', value: destination.droppableId });
    // Update the two columns taskIds fields.
    updateTwoColumnsTicketsOrder(projectId, { newStart, newFinish });

    // If move to the DONE column, add completed time.
    if (columns[destination.droppableId].isDoneColumn) {
      updateTicket(draggableId, { field: 'completedAt', value: new Date() });
    }
    // If move from the DONE column to another, unset the completed time. 
    // @TODO: Fixes update ticket api to allow multiple fields update.
    else if (columns[source.droppableId].isDoneColumn) {
      updateTicket(draggableId, { field: 'completedAt', value: null });
    };

    updateHistoryOfProject(draggableId, source.droppableId, destination.droppableId);
  }

  return (
    <Fragment>
      <TopBar project={project} isEpicModal={false} />
      <Container>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {provided => (
              <BoardContainer ref={provided.innerRef} {...provided.droppableProps} >
                {
                  columnOrder.map((columnId, index) => {
                    const thisColumn = columns[columnId];
                    return (
                      <InnerList
                        key={thisColumn.id}
                        project={project}
                        column={thisColumn}
                        ticketMap={tickets}
                        index={index}
                      />
                    )
                  })
                }
                {provided.placeholder}
                {
                  addColumnActive ? (
                    <ColumnCreate closeColumn={() => setAddColumnActive(false)} project={project} />
                  ) : (
                      <NewColumnWrapper>
                        <NewColumnButton onClick={() => {
                          if (Object.keys(columns).length >= 8) {
                            setAlert('You cannot create more than 8 columns.', 'error')
                          } else {
                            setAddColumnActive(true)
                          }
                        }}>
                          <Icon type="plus" size={16} isSolid={true} />
                        </NewColumnButton>
                      </NewColumnWrapper>
                    )
                }
              </BoardContainer>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Fragment>
  )
}

KanbanBoard.propTypes = {
  tickets: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
  updateColumnOrder: PropTypes.func.isRequired,
  updateOneColumnTicketsOrder: PropTypes.func.isRequired,
  updateTwoColumnsTicketsOrder: PropTypes.func.isRequired,
  updateTicket: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tickets: selectFilteredTickets,
});

const mapDispatchToProps = dispatch => ({
  clearAllFilters: () => dispatch(clearAllFilters()),
  updateColumnOrder: (projectId, newColumnOrder) => dispatch(updateColumnOrder(projectId, newColumnOrder)),
  updateOneColumnTicketsOrder: (projectId, newColumn) => dispatch(updateOneColumnTicketsOrder(projectId, newColumn)),
  updateTwoColumnsTicketsOrder: (projectId, newColumn) => dispatch(updateTwoColumnsTicketsOrder(projectId, newColumn)),
  updateTicket: (ticketId, newColumn) => dispatch(updateTicket(ticketId, newColumn)),
  updateHistory: (projectId, logData) => dispatch(updateHistory(projectId, logData)),
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);