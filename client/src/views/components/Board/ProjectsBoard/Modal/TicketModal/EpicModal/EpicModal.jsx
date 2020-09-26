import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../../../Form/FormSelectMenu/FormSelectMenu';
import { IssuePriorities, IssueColors } from '../../../../../../../shared/constants/issues';
import { selectMembersByProjectId } from '../../../../../../../redux/members/members.selectors';
import { selectProjectById } from '../../../../../../../redux/projects/projects.selectors';
import { selectTicketsLinkedWithEpic } from '../../../../../../../redux/tickets/tickets.selectors';
import { updateTicket, deleteEpicTicket } from '../../../../../../../redux/tickets/tickets.actions';
import Title from '../Title/Title';
import Description from '../Description/Description';
import Comment from '../Comment/Comment';
import ChildissueMenu from '../../../Form/ChildIssueMenu/ChildIssueMenu';
import DatePicker from '../../../Form/DatePicker/DatePicker';
import moment from 'moment';
import {
  ModalContainer,
  Container,
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
  Blanket,
  TopContentRight,
  TopContentLeft,
  Content
} from '../TicketModal.style';
import {
  CompleteButton,
} from './EpicModal.style';

const EpicModal = ({
  ticket,
  setIsModalOpen,
  membersList,
  linkedIssues,
  updateTicket,
  deleteEpicTicket,
}) => {

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
  const epicId = ticket._id;

  const updateTicketField = (updatedValue) => {
    updateTicket(epicId, updatedValue);
  }

  console.log(childIssues)

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleSelectMenu = (name, value) => {
    setIssueFormValues({ ...issueFormValues, [name]: value });
    updateTicketField({ [name]: value })
  };

  const handleDateChange = (updatedDateRange) => {
    setdateRange(updatedDateRange);
    updateTicketField({ dateRange: updatedDateRange })
  };

  const handleChildIssueMenu = (childIssueId, isRemoved = false) => {
    if (isRemoved) {
      setChildIssues(childIssues.filter(issue => issue !== childIssueId));
      updateTicket(childIssueId, { linkedEpic: null });
      return
    }
    setChildIssues([...childIssues, childIssueId]);
    updateTicket(childIssueId, { linkedEpic: epicId });
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
              <i className="far fa-trash-alt" onClick={() => {
                deleteEpicTicket(epicId, childIssues);
                setIsModalOpen(false);
              }}></i>
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
                        onClick={() => handleSelectMenu('isEpicDone', !isEpicDone)}
                      >
                        {isEpicDone ? 'Completed' : 'Mark Complete'}
                      </CompleteButton>
                    </div>
                    <DatePicker
                      handleDateChange={handleDateChange}
                      dateRange={dateRange}
                      isStartDate={true}
                    />
                    <DatePicker
                      handleDateChange={handleDateChange}
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
          </form>
        </Content>
      </Container>
    </ModalContainer>
  )
}

EpicModal.propTypes = {
  membersList: PropTypes.object.isRequired,
  projectInfo: PropTypes.object.isRequired,
  updateTicket: PropTypes.func.isRequired,
  deleteEpicTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  membersList: selectMembersByProjectId(ownProps.projectId),
  projectInfo: selectProjectById(ownProps.projectId),
  linkedIssues: selectTicketsLinkedWithEpic(ownProps.ticket._id),
});


export default connect(mapStateToProps, { updateTicket, deleteEpicTicket })(EpicModal);