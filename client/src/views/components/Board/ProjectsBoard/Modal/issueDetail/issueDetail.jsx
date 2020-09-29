import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
} from './IssueDetail.style';
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
  const createAt = moment(new Date(ticket.createdAt)).format('lll');
  const updatedAt = moment(new Date(ticket.updatedAt)).fromNow();

  const updateTicketField = (updatedValue) => {
    console.log(updatedValue)
    updateTicket(ticket._id, updatedValue);
  }

  const [typingTimeout, setTypingTimeout] = useState(0)

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
    // Clear timeout throughout the typing.
    clearTimeout(typingTimeout);
    // Set a timeout to run after typing ends.
    const typingTimer = setTimeout(function () {
      // Update summary field 1000ms after stops typing. 
      updateTicketField({ summary: value })
    }, 1000)
    setTypingTimeout(typingTimer)
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

  const handleEditorText = (text) => {
    setIssueFormValues({ ...issueFormValues, description: text });
  }

  const saveDescription = () => {
    updateTicketField({ description: description })
  }

  return (
    <ModalContainer onClick={() => { if (isSelectMenuOpen) setIsSelectMenuOpen(false); }}>
      <Blanket onClick={() => setIsModalOpen(false)} />
      <Container>
        <Content>
          <TopFixedContent>
            <TopContentLeft>
              {
                linkedEpic &&
                <Fragment>
                  <TicketKey className="icon-issue-epic">{linkedEpic.summary}</TicketKey>
                  <Slash style={{ margin: '0 6px' }}>/</Slash>
                </Fragment>
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
                    <Title
                      name="summary"
                      currentValue={summary}
                      handleChange={handleChange}
                    />
                    <Description
                      currentValue={description}
                      handleEditorText={handleEditorText}
                      saveDescription={saveDescription}
                    />
                    <Comment
                      comments={comments}
                      ticketId={ticket._id}
                    />
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
                        type: membersList && membersList[assigneeId] ? membersList[assigneeId].pictureUrl :
                          'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png', // @todo: figure out a better way.
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
                      <p>Updated : {updatedAt}</p>
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