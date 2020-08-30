import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Container,
  TicketStatus,
  TicketSummary
} from './Ticket.style'
import TicketModal from './TicketModal/TicketModal';
import './temp.css'
import store from '../../../../../../../redux/store';
import { deleteTicket } from '../../../../../../../redux/tickets/tickets.actions';

const Ticket = ({ ticket, index, columnId, projectId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { issueType } = ticket;
  const DeleteTicket = () => {
    store.dispatch(deleteTicket(ticket._id, columnId, projectId))
  }

  return (
    <>
      <Draggable draggableId={ticket._id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onClick={() => setIsModalOpen(true)}
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
      {
        isModalOpen ? <TicketModal setIsModalOpen={setIsModalOpen} DeleteTicket={DeleteTicket} /> : <></>
      }
    </>
  )
}

export default Ticket;