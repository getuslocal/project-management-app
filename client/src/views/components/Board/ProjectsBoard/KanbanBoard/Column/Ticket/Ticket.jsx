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
import TicketModal from '../../../Modal/TicketModal/TicketModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectMembersByProjectId } from '../../../../../../../redux/members/members.selectors';
import { selectEpicById } from '../../../../../../../redux/tickets/tickets.selectors';
import { createStructuredSelector } from 'reselect';
import { IssueColors } from '../../../.././../../../shared/constants/issues'
import Modal from '../../../Modal/Modal';

const Ticket = ({ ticket, index, columnId, projectId, members, linkedEpic }) => {
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
  members: PropTypes.object.isRequired,
  linkedEpic: PropTypes.object
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  members: selectMembersByProjectId(ownProps.projectId),
  linkedEpic: selectEpicById(ownProps.ticket.linkedEpic)
});

export default connect(mapStateToProps, null)(Ticket);