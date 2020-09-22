import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../../Form/FormSelectMenu/FormSelectMenu';
import { IssueTypes, IssuePriorities, IssueStyles, IssueColors } from '../../../../../../shared/constants/issues';
import { selectMembersByProjectId } from '../../../../../../redux/members/members.selectors';
import { selectProjectById } from '../../../../../../redux/projects/projects.selectors';
import { updateTicket, updateEpicTicket } from '../../../../../../redux/tickets/tickets.actions';
import store from '../../../../../../redux/store';
import IssueStatusMenu from '../../KanbanBoard/Column/Ticket/TicketModal/IssueStatusMenu/IssueStatusMenu';
import Title from '../../KanbanBoard/Column/Ticket/TicketModal/Title/Title';
import Description from '../../KanbanBoard/Column/Ticket/TicketModal/Description/Description';
import Comment from '../../KanbanBoard/Column/Ticket/TicketModal/Comment/Comment';
import ChildissueMenu from '../../Form/ChildIssueMenu/ChildIssueMenu';
import DatePicker from '../../Form/DatePicker/DatePicker';
import moment from 'moment';
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
  CompleteButton,
  Blanket
} from './TicketModal.style';
import {
  ModalContainer,
  Container,
  Content,
  Fieldset,
  Diviser
} from '../Modal.style';

const TicketModal = ({ ticket, setIsModalOpen, deleteTicket, membersList, projectInfo, columnId, isEpicTicket }) => {
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

  const [epicFromValues, setEpicFromValues] = useState({
    issueColor: ticket.issueColor,
    isEpicDone: false,
    childIssues: ticket.childIssues
  });

  const [dateRange, setdateRange] = useState(() => {
    if (!isEpicTicket) return null
    return {
      startDate: moment(ticket.dateRange.startDate),
      endDate: moment(ticket.dateRange.endDate)
    }
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

  const { issueColor, childIssues, isEpicDone } = epicFromValues;

  const columnsList = projectInfo.columns;
  // @todo: Add updated time.
  const createAt = String(new Date(ticket.createdAt)).substring(0, 15);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEpicTicket) {
      console.log({ ...issueFormValues, ...epicFromValues, dateRange })
      store.dispatch(updateEpicTicket(ticket._id, { ...issueFormValues, ...epicFromValues, dateRange }));
    } else {
      const columnMove = {
        beforeColumn: columnId,
        afterColumn: issueStatus
      }
      store.dispatch(updateTicket(columnMove, ticket._id, issueFormValues));
    }

    setIsModalOpen(false);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleSelectMenu = (name, value) => {
    if (isEpicTicket) {
      setEpicFromValues({ ...epicFromValues, [name]: value });
      return
    }
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleChildIssueMenu = (issueId, isActive = false) => {
    if (isActive) {
      setEpicFromValues({ ...epicFromValues, childIssues: childIssues.filter(issue => issue !== issueId) });
      return
    }
    setEpicFromValues({ ...epicFromValues, childIssues: [...childIssues, issueId] });
  };

  return (
    <ModalContainer onClick={() => { if (isSmallModalOpen) setIsSmallModalOpen(false); }}>
      <Blanket onClick={() => setIsModalOpen(false)} />
      <Container>
        <Content>
          <TopFixedContent>
            <TicketKey className={`icon-issue-${issueType.toLowerCase()}`}>{ticket.key}</TicketKey>
            <i className="far fa-trash-alt" onClick={deleteTicket}></i>
            <i className="fas fa-times" onClick={() => setIsModalOpen(false)}></i>
          </TopFixedContent>

          <form onSubmit={handleSubmit}>
            <InnerWrapper>
              <FormContainer>
                <FormLeftContent>
                  <Fieldset>
                    <Title name="summary" currentValue={summary} handleChange={handleChange} />
                    <Description currentValue={description} handleChange={handleChange} />
                    {
                      isEpicTicket &&
                      <ChildissueMenu
                        label="Child issues"
                        name="childIssues"
                        isEpicTicket={isEpicTicket}
                        childIssues={childIssues}
                        handleModalOpen={setIsSmallModalOpen}
                        isModalOpen={isSmallModalOpen}
                        handleSelectMenu={handleSelectMenu}
                        handleChildIssueMenu={handleChildIssueMenu}
                      />
                    }
                    <Comment comments={ticket.comments} ticketId={ticket._id} />
                  </Fieldset>
                </FormLeftContent>
                <FormRightContent>
                  <Fieldset>
                    {!isEpicTicket ?
                      <IssueStatusMenu
                        name="issueStatus"
                        value={columnsList[issueStatus].title}
                        currentOrder={issueStatus}
                        columnOrder={projectInfo.columnOrder}
                        columnsList={{ ...columnsList, [issueStatus]: undefined }}
                        handleModalOpen={setIsSmallModalOpen}
                        isModalOpen={isSmallModalOpen}
                        handleSelectMenu={handleSelectMenu}
                        required
                      />
                      :
                      <>
                        <div>
                          <CompleteButton
                            isEpicDone={isEpicDone}
                            className="icon-check"
                            type="button"
                            onClick={() => setEpicFromValues({ ...epicFromValues, isEpicDone: !isEpicDone })}
                          >
                            {isEpicDone ?
                              'Completed'
                              :
                              'Mark Complete'
                            }
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
                      </>
                    }
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
                    {
                      isEpicTicket &&
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
                    }
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

TicketModal.propTypes = {
  membersList: PropTypes.object.isRequired,
  projectInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  membersList: selectMembersByProjectId(ownProps.projectId),
  projectInfo: selectProjectById(ownProps.projectId)
});


export default connect(mapStateToProps, null)(TicketModal);