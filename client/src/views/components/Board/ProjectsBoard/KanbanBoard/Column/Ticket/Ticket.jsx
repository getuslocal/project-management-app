import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Container,
} from './Ticket.style'

const Ticket = ({ ticket, index }) => {
  console.log('Child render')

  return (
    <Draggable draggableId={ticket._id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {ticket.summary}
        </Container>
      )}
    </Draggable>
  )
}

export default Ticket;