import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Container,
  TicketStatus,
  TicketSummary
} from './Ticket.style'

const Ticket = ({ ticket, index }) => {
  const { issueType } = ticket;
  // console.log(ticket.issueType)

  return (
    <Draggable draggableId={ticket._id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <TicketSummary>
            {ticket.summary}
          </TicketSummary>
          <TicketStatus className={`icon-issue-${issueType.toLowerCase()}`}>
            PMA-123
          </TicketStatus>
        </Container>
      )}
    </Draggable>
  )
}

export default Ticket;