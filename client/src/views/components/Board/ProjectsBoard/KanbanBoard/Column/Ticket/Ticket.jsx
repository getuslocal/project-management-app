import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Container,
  TicketStatus,
  TicketSummary,
  Bottom,
  CustomIcon,
  EpicWrapper,
  Epic,
} from './Ticket.style'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectMemberById } from '../../../../../../../redux/members/members.selectors';
import { selectEpicById } from '../../../../../../../redux/tickets/tickets.selectors';
import { createStructuredSelector } from 'reselect';
import { IssueColors } from '../../../.././../../../shared/constants/issues'
import Modal from '../../../Modal/Modal';

const Ticket = ({ ticket, index, columnId, assignee, linkedEpic }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { issueType, _id: ticketId, key } = ticket;
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
            {
              linkedEpic &&
              <EpicWrapper>
                <Epic issueColor={IssueColors[linkedEpic.issueColor.toUpperCase()]}>
                  {linkedEpic.summary}
                </Epic>
              </EpicWrapper>
            }
            <Bottom>
              <TicketStatus className={`icon-issue-${issueType.toLowerCase()}`}>
                {key}
              </TicketStatus>
              {assignee && (
                <CustomIcon
                  type="user-icon"
                  imageUrl={assignee.pictureUrl}
                  size={27} />)}
            </Bottom>
          </Container>
        )}
      </Draggable>
      {
        isModalOpen && (
          <Modal
            isTicketModalOpen={true}
            ticket={ticket}
            linkedEpic={linkedEpic}
            columnId={columnId}
            setIsModalOpen={setIsModalOpen}
          />
        )
      }
    </>
  )
}

Ticket.propTypes = {
  assignee: PropTypes.object,
  linkedEpic: PropTypes.object
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  assignee: selectMemberById(ownProps.ticket.assigneeId),
  linkedEpic: selectEpicById(ownProps.ticket.linkedEpic)
});

export default connect(mapStateToProps, null)(Ticket);