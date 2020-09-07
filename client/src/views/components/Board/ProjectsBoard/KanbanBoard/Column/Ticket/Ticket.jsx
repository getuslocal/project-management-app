import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Container,
  TicketStatus,
  TicketSummary
} from './Ticket.style'
import TicketModal from './TicketModal/TicketModal';
import { deleteTicket } from '../../../../../../../redux/tickets/tickets.actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Ticket = ({ ticket, index, columnId, projectId, deleteTicket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { issueType, _id: ticketId } = ticket;
  const DeleteTicket = () => {
    deleteTicket(ticket._id, columnId, projectId);
  }

  return (
    <>
      <Draggable draggableId={ticketId} index={index}>
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
        isModalOpen ? (
          <TicketModal
            ticket={ticket}
            columnId={columnId}
            projectId={projectId}
            setIsModalOpen={setIsModalOpen}
            DeleteTicket={DeleteTicket}
          />
        ) : (
            <></>
          )
      }
    </>
  )
}

Ticket.propTypes = {
  deleteTicket: PropTypes.func.isRequired,
};

export default connect(null, { deleteTicket })(Ticket);