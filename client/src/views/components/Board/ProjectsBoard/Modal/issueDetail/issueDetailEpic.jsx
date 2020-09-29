import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../../Form/FormSelectMenu/FormSelectMenu';
import { IssuePriorities, IssueColors } from '../../../../../../shared/constants/issues';
import { selectTicketsLinkedWithEpic } from '../../../../../../redux/tickets/tickets.selectors';
import { updateTicket, deleteEpicTicket } from '../../../../../../redux/tickets/tickets.actions';
import Title from './Title/Title';
import Description from './Description/Description';
import Comment from './Comment/Comment';
import ChildissueMenu from '../../Form/ChildIssueMenu/ChildIssueMenu';
import DatePicker from '../../Form/DatePicker/DatePicker';
import moment from 'moment';
import {
  ModalContainer,
  Container,
  Fieldset,
  Diviser
} from '../Modal.style';
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
} from './IssueDetail.style';
import {
  CompleteButton,
} from './IssueDetaillEpic.style';

const EpicModal = ({
  ticket,
  setIsModalOpen,
  membersList,
  linkedIssues,
  updateTicket,
  deleteEpicTicket,
}) => {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
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

  console.log('redner')

  const [dateRange, setdateRange] = useState({
    startDate: moment(ticket.dateRange.startDate),
    endDate: moment(ticket.dateRange.endDate)
  });

  const [typingTimeout, setTypingTimeout] = useState(0)

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

  console.log(comments)

  const createAt = moment(new Date(ticket.createdAt)).format('lll');
  const updatedAt = moment(new Date(ticket.updatedAt)).fromNow();
  const epicId = ticket._id;

  const updateTicketField = (updatedValue) => {
    updateTicket(epicId, updatedValue);
  }

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
                    <Description
                      currentValue={description}
                      handleEditorText={handleEditorText}
                      saveDescription={saveDescription}
                    />
                    <ChildissueMenu
                      label="Child issues"
                      name="childIssues"
                      isEpicTicket={true}
                      childIssues={childIssues}
                      setIsSelectMenuOpen={setIsSelectMenuOpen}
                      isSelectMenuOpen={isSelectMenuOpen}
                      handleSelectMenu={handleSelectMenu}
                      handleChildIssueMenu={handleChildIssueMenu}
                    />
                    <Comment
                      comments={comments}
                      ticketId={ticket._id}
                    />
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
                    <FormSelectMenu
                      label="Issue color"
                      name="issueColor"
                      value={issueColor}
                      selectList={{ ...IssueColors, [issueColor.toUpperCase()]: undefined }}
                      setIsSelectMenuOpen={setIsSelectMenuOpen}
                      isSelectMenuOpen={isSelectMenuOpen}
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

EpicModal.propTypes = {
  updateTicket: PropTypes.func.isRequired,
  deleteEpicTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  linkedIssues: selectTicketsLinkedWithEpic(ownProps.ticket._id),
});


export default connect(mapStateToProps, { updateTicket, deleteEpicTicket })(EpicModal);