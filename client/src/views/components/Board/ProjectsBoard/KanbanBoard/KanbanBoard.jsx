import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { updateOneColumnTicketsOrder, updateTwoColumnsTicketsOrder, updateColumnOrder } from '../../../../../redux/projects/projects.actions';
import store from '../../../../../redux/store';
import Column from './Column/Column';
import {
  Container,
} from './KanbanBoard.style';

function getTickets(ticketMap, taskIds) {
  let arr = [];
  taskIds.forEach(taskId => {
    ticketMap.forEach(ticket => {
      if (ticket._id === taskId) {
        arr.push(ticket)
      }
    })
  })
  return arr
}

const InnerList = React.memo(props => {
  const { column, ticketMap, index, projectId } = props;
  return <Column column={column} tickets={getTickets(ticketMap, column.taskIds)} index={index} projectId={projectId} />
})

const KanbanBoard = ({ projectInfo, tickets }) => {
  const { columnOrder, columns, _id, name } = projectInfo;

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
      const newColumnOrder = Array.from(projectInfo.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      store.dispatch(updateColumnOrder(_id, newColumnOrder));
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTicketsIds = Array.from(start.taskIds);
      // console.log(source)
      // console.log(column.taskIds)
      newTicketsIds.splice(source.index, 1);
      newTicketsIds.splice(destination.index, 0, draggableId);
      // console.log(newTicketsIds)

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

  console.log(tickets)

  // @todo: change taskIds to ticketIds.
  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {provided => (
            <Container ref={provided.innerRef} {...provided.droppableProps} >
              {
                columnOrder.map((columnId, index) => {
                  const thisColumn = columns[columnId];
                  return <InnerList key={thisColumn.id} column={thisColumn} ticketMap={tickets} index={index} projectId={_id} />
                })
              }
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
  )
}

export default KanbanBoard;