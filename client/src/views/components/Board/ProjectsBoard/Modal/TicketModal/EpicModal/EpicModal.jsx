import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../../../Form/FormSelectMenu/FormSelectMenu';
import { IssuePriorities, IssueColors } from '../../../../../../../shared/constants/issues';
import { selectMembersByProjectId } from '../../../../../../../redux/members/members.selectors';
import { selectProjectById } from '../../../../../../../redux/projects/projects.selectors';
import { selectTicketsLinkedWithEpic } from '../../../../../../../redux/tickets/tickets.selectors';
import { updateEpicTicket } from '../../../../../../../redux/tickets/tickets.actions';
import store from '../../../../../../../redux/store';
import Title from '../../../KanbanBoard/Column/Ticket/TicketModal/Title/Title';
import Description from '../../../KanbanBoard/Column/Ticket/TicketModal/Description/Description';
import Comment from '../../../KanbanBoard/Column/Ticket/TicketModal/Comment/Comment';
import ChildissueMenu from '../../../Form/ChildIssueMenu/ChildIssueMenu';
import DatePicker from '../../../Form/DatePicker/DatePicker';
import moment from 'moment';
import {
  ModalContainer,
  Container,
  Content,
  Fieldset,
  Diviser
} from '../../Modal.style';
import {
  InnerWrapper,
  FormContainer,
  FormLeftContent,
  FormRightContent,
  TopFixedContent,
  TicketKey,
  TicketHistoryContent,
  ButtonsContainer,
  SubmitButton,
  Blanket,
  TopContentRight,
  TopContentLeft
} from '../TicketModal.style';
import {
  CompleteButton,
} from './EpicModal.style';

const EpicModal = ({ ticket, setIsModalOpen, membersList, deleteTicket, linkedIssues }) => {
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [issueFormValues, setIssueFormValues] = useState({
    issueType: ticket.issueType,
    summary: ticket.summary,
    description: ticket.description,
    reporterId: ticket.reporterId,
    assigneeId: ticket.assigneeId,
    issuePriority: ticket.issuePriority,
    comments: ticket.comments,
    issueColor: ticket.issueColor,
    isEpicDone: ticket.isEpicDone,
  });

  const [childIssues, setChildIssues] = useState(linkedIssues);

  const [dateRange, setdateRange] = useState({
    startDate: moment(ticket.dateRange.startDate),
    endDate: moment(ticket.dateRange.endDate)
  });

  const {
    issueType,
    summary,
    description,
    reporterId,
    assigneeId,
    issuePriority,
    comments,
    issueColor,
    isEpicDone
  } = issueFormValues;

  const createAt = String(new Date(ticket.createdAt)).substring(0, 15);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(childIssues)
    store.dispatch(updateEpicTicket(ticket._id, { ...issueFormValues, dateRange }, childIssues));
    setIsModalOpen(false);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleSelectMenu = (name, value) => {
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleChildIssueMenu = (issueId, isActive = false) => {
    if (isActive) {
      setChildIssues(childIssues.filter(issue => issue !== issueId));
      return
    }
    setChildIssues([...childIssues, issueId]);
  };

  return (
    <ModalContainer onClick={() => { if (isSmallModalOpen) setIsSmallModalOpen(false); }}>
      <Blanket onClick={() => setIsModalOpen(false)} />
      <Container>
        <Content>
          <TopFixedContent>
            <TopContentLeft>
              <TicketKey className={`icon-issue-${issueType.toLowerCase()}`}>{ticket.key}</TicketKey>
            </TopContentLeft>
            <TopContentRight>
              <i className="far fa-trash-alt" onClick={deleteTicket}></i>
              <i className="fas fa-times" onClick={() => setIsModalOpen(false)}></i>
            </TopContentRight>
          </TopFixedContent>

          <form onSubmit={handleSubmit}>
            <InnerWrapper>
              <FormContainer>
                <FormLeftContent>
                  <Fieldset>
                    <Title name="summary" currentValue={summary} handleChange={handleChange} />
                    <Description currentValue={description} handleChange={handleChange} />
                    <ChildissueMenu
                      label="Child issues"
                      name="childIssues"
                      isEpicTicket={true}
                      childIssues={childIssues}
                      handleModalOpen={setIsSmallModalOpen}
                      isModalOpen={isSmallModalOpen}
                      handleSelectMenu={handleSelectMenu}
                      handleChildIssueMenu={handleChildIssueMenu}
                    />
                    <Comment comments={ticket.comments} ticketId={ticket._id} />
                  </Fieldset>
                </FormLeftContent>
                <FormRightContent>
                  <Fieldset>
                    <div>
                      <CompleteButton
                        isEpicDone={isEpicDone}
                        className="icon-check"
                        type="button"
                        onClick={() => setIssueFormValues({ ...issueFormValues, isEpicDone: !isEpicDone })}
                      >
                        {isEpicDone ? 'Completed' : 'Mark Complete'}
                      </CompleteButton>
                    </div>
                    <DatePicker
                      setdateRange={setdateRange}
                      dateRange={dateRange}
                      isStartDate={true}
                    />
                    <DatePicker
                      setdateRange={setdateRange}
                      dateRange={dateRange}
                      isEndDate={true}
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
                    <FormSelectMenu
                      label="Issue color"
                      name="issueColor"
                      value={issueColor}
                      selectList={{ ...IssueColors, [issueColor.toUpperCase()]: undefined }}
                      handleModalOpen={setIsSmallModalOpen}
                      isModalOpen={isSmallModalOpen}
                      handleSelectMenu={handleSelectMenu}
                      isTransparentBackground={true}
                      renderValue="name"
                      returnValue="name"
                      iconStyle={{
                        base: 'issueColor',
                        type: issueColor,
                        size: '11px',
                        renderValue: 'name'
                      }}
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
            <ButtonsContainer>
              <SubmitButton value="Update" type="submit" />
            </ButtonsContainer>
          </form>
        </Content>
      </Container>
    </ModalContainer>
  )
}

EpicModal.propTypes = {
  membersList: PropTypes.object.isRequired,
  projectInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  membersList: selectMembersByProjectId(ownProps.projectId),
  projectInfo: selectProjectById(ownProps.projectId),
  linkedIssues: selectTicketsLinkedWithEpic(ownProps.ticket._id),
});


export default connect(mapStateToProps, null)(EpicModal);