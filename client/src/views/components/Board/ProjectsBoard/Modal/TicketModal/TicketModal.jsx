import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../../Form/FormSelectMenu/FormSelectMenu';
import { IssuePriorities } from '../../../../../../shared/constants/issues';
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
  linkedEpic,
  columnId,
  membersList,
  setIsModalOpen,
  deleteTicket,
  projectInfo,
  updateTicket,
  updateTicketStatus
}) => {

  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);

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
    <ModalContainer onClick={() => { if (isSelectMenuOpen) setIsSelectMenuOpen(false); }}>
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
                      setIsSelectMenuOpen={setIsSelectMenuOpen}
                      isSelectMenuOpen={isSelectMenuOpen}
                      handleStatusChange={handleStatusChange}
                      required
                    />
                    <FormSelectMenu
                      label="Assignee"
                      name="assigneeId"
                      value={membersList && membersList[assigneeId] ? membersList[assigneeId].name : "Unassigned"}
                      selectList={{ ...membersList, [assigneeId]: undefined }}
                      setIsSelectMenuOpen={setIsSelectMenuOpen}
                      isSelectMenuOpen={isSelectMenuOpen}
                      handleSelectMenu={handleSelectMenu}
                      renderValue="name"
                      returnValue="_id"
                      iconStyle={{
                        base: 'userIcon',
                        type: membersList && membersList[assigneeId] ? membersList[assigneeId].pictureUrl : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png', // @todo: figure out a better way.
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
                      setIsSelectMenuOpen={setIsSelectMenuOpen}
                      isSelectMenuOpen={isSelectMenuOpen}
                      handleSelectMenu={handleSelectMenu}
                      required
                      isTransparentBackground={true}
                      iconStyle={{ base: 'priority', type: issuePriority, size: '12px' }}
                      height="40px"
                    />
                    <FormSelectMenu
                      label="Reporter"
                      name="reporterId"
                      value={membersList && membersList[reporterId].name}
                      selectList={{ ...membersList, [reporterId]: undefined }}
                      setIsSelectMenuOpen={setIsSelectMenuOpen}
                      isSelectMenuOpen={isSelectMenuOpen}
                      handleSelectMenu={handleSelectMenu}
                      renderValue='name'
                      returnValue="_id"
                      isTransparentBackground={true}
                      iconStyle={{
                        base: 'userIcon',
                        type: membersList && membersList[reporterId].pictureUrl,
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
  projectInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  projectInfo: selectProjectById(ownProps.currentProjectId)
});


export default connect(mapStateToProps, { updateTicket, updateTicketStatus, deleteTicket })(TicketModal);