import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { updateOneColumnTicketsOrder, updateTwoColumnsTicketsOrder, updateColumnOrder } from '../../../../../redux/projects/projects.actions';
import { selectFilteredTickets } from '../../../../../redux/tickets/tickets.selectors';
import store from '../../../../../redux/store';
import Column from './Column/Column';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  Container,
} from './KanbanBoard.style';
import TopBar from '../TopBar/TopBar';

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
  const { column, ticketMap, index } = props;
  return <Column column={column} tickets={getTickets(ticketMap, column.taskIds)} index={index} />
})

const KanbanBoard = ({ project, tickets }) => {
  const { columnOrder, columns, _id, name } = project;
  console.log('KanbanBoard render')

  const onDragEnd = result => {
    // console.log(result)
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
      const newColumnOrder = Array.from(project.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      store.dispatch(updateColumnOrder(_id, newColumnOrder));
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTicketsIds = Array.from(start.taskIds);
      newTicketsIds.splice(source.index, 1);
      newTicketsIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTicketsIds,
      };

      store.dispatch(updateOneColumnTicketsOrder(_id, newColumn));
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

    store.dispatch(updateTwoColumnsTicketsOrder(_id, { newStart, newFinish }));
  }

  // @todo: change taskIds to ticketIds.
  return (
    <>
      <TopBar project={project} isEpicModal={false} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {provided => (
            <Container ref={provided.innerRef} {...provided.droppableProps} >
              {
                columnOrder.map((columnId, index) => {
                  const thisColumn = columns[columnId];
                  return <InnerList key={thisColumn.id} column={thisColumn} ticketMap={tickets} index={index} />
                })
              }
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}


KanbanBoard.propTypes = {
  tickets: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tickets: selectFilteredTickets,
});

export default connect(mapStateToProps, null)(KanbanBoard);