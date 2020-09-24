import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../../Form/FormSelectMenu/FormSelectMenu';
import { IssuePriorities } from '../../../../../../shared/constants/issues';
import { selectMembersByProjectId } from '../../../../../../redux/members/members.selectors';
import { selectProjectById } from '../../../../../../redux/projects/projects.selectors';
import { updateTicket, deleteTicket } from '../../../../../../redux/tickets/tickets.actions';
import { updateTicketStatus } from '../../../../../../redux/projects/projects.actions';
import IssueStatusMenu from './IssueStatusMenu/IssueStatusMenu';
import Title from './Title/Title';
import Description from './Description/Description';
import Comment from './Comment/Comment';
import {
  InnerWrapper,
  FormContainer,
  FormLeftContent,
  FormRightContent,
  TopFixedContent,
  TicketKey,
  TicketHistoryContent,
  Blanket,
  TopContentLeft,
  TopContentRight,
  Slash,
  Content
} from './TicketModal.style';
import {
  ModalContainer,
  Container,
  Fieldset,
  Diviser
} from '../Modal.style';

const TicketModal = ({
  ticket,
  setIsModalOpen,
  deleteTicket,
  membersList,
  projectInfo,
  columnId,
  linkedEpic,
  updateTicket,
  updateTicketStatus
}) => {

  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [issueFormValues, setIssueFormValues] = useState({
    issueType: ticket.issueType,
    issueStatus: columnId,
    summary: ticket.summary,
    description: ticket.description,
    reporterId: ticket.reporterId,
    assigneeId: ticket.assigneeId,
    issuePriority: ticket.issuePriority,
    comments: ticket.comments,
  });

  const {
    issueType,
    issueStatus,
    summary,
    description,
    reporterId,
    assigneeId,
    issuePriority,
    comments,
  } = issueFormValues;

  const columnsList = projectInfo.columns;
  // @todo: Add updated time.
  const createAt = String(new Date(ticket.createdAt)).substring(0, 15);

  const updateTicketField = (updatedValue) => {
    updateTicket(ticket._id, updatedValue);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleSelectMenu = (name, value) => {
    setIssueFormValues({ ...issueFormValues, [name]: value });
    updateTicketField({ [name]: value })
  };

  const handleStatusChange = (afterColumn) => {
    const columnMove = {
      beforeColumn: columnId,
      afterColumn: afterColumn
    }
    setIssueFormValues({ ...issueFormValues, issueStatus: afterColumn });
    updateTicketStatus(columnMove, ticket._id, projectInfo._id);
  };

  return (
    <ModalContainer onClick={() => { if (isSmallModalOpen) setIsSmallModalOpen(false); }}>
      <Blanket onClick={() => setIsModalOpen(false)} />
      <Container>
        <Content>
          <TopFixedContent>
            <TopContentLeft>
              {
                linkedEpic &&
                <>
                  <TicketKey className="icon-issue-epic">{linkedEpic.summary}</TicketKey>
                  <Slash style={{ margin: '0 6px' }}>/</Slash>
                </>
              }
              <TicketKey className={`icon-issue-${issueType.toLowerCase()}`}>{ticket.key}</TicketKey>
            </TopContentLeft>
            <TopContentRight>
              <i className="far fa-trash-alt" onClick={() => deleteTicket(ticket._id, columnId)}></i>
              <i className="fas fa-times" onClick={() => setIsModalOpen(false)}></i>
            </TopContentRight>
          </TopFixedContent>
          <form>
            <InnerWrapper>
              <FormContainer>
                <FormLeftContent>
                  <Fieldset>
                    <Title name="summary" currentValue={summary} handleChange={handleChange} />
                    <Description currentValue={description} handleChange={handleChange} />
                    <Comment comments={ticket.comments} ticketId={ticket._id} />
                  </Fieldset>
                </FormLeftContent>
                <FormRightContent>
                  <Fieldset>
                    <IssueStatusMenu
                      name="issueStatus"
                      value={columnsList[issueStatus].title}
                      currentOrder={issueStatus}
                      columnOrder={projectInfo.columnOrder}
                      columnsList={{ ...columnsList, [issueStatus]: undefined }}
                      handleModalOpen={setIsSmallModalOpen}
                      isModalOpen={isSmallModalOpen}
                      handleStatusChange={handleStatusChange}
                      required
                    />
                    <FormSelectMenu
                      label="Assignee"
                      name="assigneeId"
                      value={membersList[assigneeId] ? membersList[assigneeId].name : "Unassigned"}
                      selectList={{ ...membersList, [assigneeId]: undefined }}
                      handleModalOpen={setIsSmallModalOpen}
                      isModalOpen={isSmallModalOpen}
                      handleSelectMenu={handleSelectMenu}
                      renderValue="name"
                      returnValue="_id"
                      iconStyle={{
                        base: 'userIcon',
                        type: membersList[assigneeId] ? membersList[assigneeId].pictureUrl : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png', // @todo: figure out a better way.
                        size: '30px',
                        renderValue: 'pictureUrl'
                      }}
                      isTransparentBackground={true}
                      height="40px"
                    />
                    <FormSelectMenu
                      label="Priority"
                      name="issuePriority"
                      value={issuePriority}
                      selectList={{ ...IssuePriorities, [issuePriority.toUpperCase()]: undefined }}
                      handleModalOpen={setIsSmallModalOpen}
                      isModalOpen={isSmallModalOpen}
                      handleSelectMenu={handleSelectMenu}
                      required
                      isTransparentBackground={true}
                      iconStyle={{ base: 'priority', type: issuePriority, size: '12px' }}
                      height="40px"
                    />
                    <FormSelectMenu
                      label="Reporter"
                      name="reporterId"
                      value={membersList[reporterId].name}
                      selectList={{ ...membersList, [reporterId]: undefined }}
                      handleModalOpen={setIsSmallModalOpen}
                      isModalOpen={isSmallModalOpen}
                      handleSelectMenu={handleSelectMenu}
                      renderValue='name'
                      returnValue="_id"
                      isTransparentBackground={true}
                      iconStyle={{
                        base: 'userIcon',
                        type: membersList[reporterId].pictureUrl,
                        size: '30px',
                        renderValue: 'pictureUrl'
                      }}
                      required
                      height="40px"
                    />
                    <Diviser />
                    <TicketHistoryContent>
                      <p>Created : {createAt}</p>
                      <p>Updated : 18 minutes ago</p>
                    </TicketHistoryContent>
                  </Fieldset>
                </FormRightContent>
              </FormContainer>
            </InnerWrapper>
          </form>
        </Content>
      </Container>
    </ModalContainer>
  )
}

TicketModal.propTypes = {
  membersList: PropTypes.object.isRequired,
  projectInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  membersList: selectMembersByProjectId(ownProps.projectId),
  projectInfo: selectProjectById(ownProps.projectId)
});


export default connect(mapStateToProps, { updateTicket, updateTicketStatus, deleteTicket })(TicketModal);