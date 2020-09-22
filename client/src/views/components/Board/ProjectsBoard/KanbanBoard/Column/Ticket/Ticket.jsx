import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Container,
  TicketStatus,
  TicketSummary,
  Bottom,
  CustomIcon
} from './Ticket.style'
import TicketModal from '../../../Modal/TicketModal/TicketModal';
import { deleteTicket } from '../../../../../../../redux/tickets/tickets.actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectMembersByProjectId } from '../../../../../../../redux/members/members.selectors';
import { createStructuredSelector } from 'reselect';

const Ticket = ({ ticket, index, columnId, projectId, deleteTicket, members }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { issueType, _id: ticketId, key, assigneeId } = ticket;

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
            <Bottom>
              <TicketStatus className={`icon-issue-${issueType.toLowerCase()}`}>{key}</TicketStatus>
              {
                Object.keys(members).length > 0 && assigneeId ?
                  <CustomIcon iconStyle={{
                    base: 'userIcon',
                    type: members[assigneeId].pictureUrl,
                    size: '27px',
                  }} />
                  :
                  <></>
              }
            </Bottom>
          </Container>
        )}
      </Draggable>
      {
        isModalOpen && (
          <TicketModal
            ticket={ticket}
            columnId={columnId}
            projectId={projectId}
            isEpicTicket={false}
            setIsModalOpen={setIsModalOpen}
            deleteTicket={() => deleteTicket(ticket._id, columnId, projectId)}
          />
        )
      }
    </>
  )
}

Ticket.propTypes = {
  deleteTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  members: selectMembersByProjectId(ownProps.projectId)
});

export default connect(mapStateToProps, { deleteTicket })(Ticket);