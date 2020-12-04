import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectProjectById } from '../../../../../redux/projects/projects.selectors';
import { updateTicket, deleteTicket, deleteEpicTicket } from '../../../../../redux/tickets/tickets.actions';
import { updateHistory } from '../../../../../redux/projects/projects.actions';
import { selectTicketByKey, selectTicketsLinkedWithEpic } from '../../../../../redux/tickets/tickets.selectors';
import { IssueHistoryTypes, IssueTypes } from '../../../../../shared/constants/issues';
import Header from './Header/Header';
import Title from './Title/Title';
import Description from './Description/Description';
import Comments from './Comments/Comments';
import Priority from './Priority/Priority';
import Reporter from './Reporter/Reporter';
import Assignee from './Assignee/Assignee';
import Status from './Status/Status';
import Dates from './Dates/Dates';
import SingleDatePicker from '../../../../../shared/components/SingleDatePicker/SingleDatePicker';
import Colors from './Colors/Colors';
import DatePicker from './DatePicker/DatePicker';
import ChildIssue from './ChildIssue/ChildIssue';
import {
  Content,
  Blanket,
  Left,
  Right,
  Wrapper,
} from './IssueDetail.style';
import {
  ModalContainer,
  Container,
  Fieldset,
  Diviser
} from '../Modal.style';
import { setAlert } from '../../../../../redux/alert/alert.actions';

const getColumnIdOfTicket = (columns, ticketId) => {
  const foundColumn = Object.values(columns).find(column => column.taskIds.includes(ticketId));
  if (foundColumn) return foundColumn.id;
  else return null
}

const IssueDetail = ({
  ticket,
  projectInfo,
  deleteTicket,
  deleteEpicTicket,
  updateTicket,
  linkedIssues,
  updateHistory,
  setAlert,
  ...props
}) => {

  const {
    issueType,
    summary,
    description,
    reporterId,
    assigneeId,
    issuePriority,
    comments,
    _id: ticketId,
    key,
    createdAt,
    updatedAt,
    completedAt,
    linkedEpic,
    dueDate
  } = ticket;

  const isEpic = (ticket.issueType === IssueTypes.EPIC);
  const [childIssues, setChildIssues] = useState(linkedIssues);

  const updateTicketField = (updatedValue) => {
    // Update ticket.
    console.log(updatedValue)
    updateTicket(ticket._id, updatedValue);
  }

  // Update history of project.
  const updateTicketHistory = (field, beforeValue, afterValue, type = IssueHistoryTypes.UPDATE) => {
    const logData = {
      ticket: {
        id: ticket._id,
        displayValue: `${ticket.key}: ${ticket.summary}`,
        type: ticket.issueType,
      },
      type: type,
      field: field,
      before: beforeValue,
      after: afterValue,
    }
    updateHistory(projectInfo._id, logData)
  }

  // Delete Ticket
  const handleDeleteTicket = () => {
    if (isEpic) {
      deleteEpicTicket(ticketId, childIssues);
    } else {
      const columnId = getColumnIdOfTicket(projectInfo.columns, ticketId);
      deleteTicket(ticketId, columnId);
    }
    props.history.push(props.match.url);
    setAlert(`${projectInfo.key}-${ticket.key} is deleted successfully.`, 'success');
  }

  // Close modal by removing query string of selectedIssue.
  const closeModal = () => {
    props.history.push(props.match.url)
  }

  return (
    <ModalContainer>
      <Blanket onClick={closeModal} />
      <Container>
        <Wrapper>
          <Header
            linkedEpic={linkedEpic}
            ticketKey={key}
            projectKey={projectInfo.key}
            issueType={issueType}
            handleDeleteTicket={handleDeleteTicket}
            closeModal={closeModal}
          />
          <Content>
            <Left>
              <Fieldset>
                <Title
                  currentValue={summary}
                  updateTicketField={updateTicketField}
                  updateTicketHistory={updateTicketHistory}
                />
                <Description
                  currentValue={description}
                  updateTicketField={updateTicketField}
                  updateTicketHistory={updateTicketHistory}
                />
                {isEpic && (
                  <ChildIssue
                    epicId={ticketId}
                    childIssues={childIssues}
                    setChildIssues={setChildIssues}
                    updateTicket={updateTicket}
                  />)}
                <Comments
                  comments={comments}
                  ticketId={ticketId}
                  updateTicketHistory={updateTicketHistory}
                />
              </Fieldset>
            </Left>
            <Right>
              <Fieldset>
                {!isEpic ? (
                  <Status
                    columns={projectInfo.columns}
                    columnOrder={projectInfo.columnOrder}
                    projectId={projectInfo._id}
                    ticket={ticket}
                    updateTicketHistory={updateTicketHistory}
                  />) : (
                    <Fragment>
                      <DatePicker
                        dateRange={ticket.dateRange}
                        updateTicketField={updateTicketField}
                        isStartDate={true}
                        updateTicketHistory={updateTicketHistory}
                      />
                      <DatePicker
                        dateRange={ticket.dateRange}
                        updateTicketField={updateTicketField}
                        isEndDate={true}
                        updateTicketHistory={updateTicketHistory}
                      />
                    </Fragment>
                  )}
                {dueDate && (
                  <SingleDatePicker
                    momentedDate={moment(dueDate)}
                    onDateChange={(date) => updateTicketField({ field: 'dueDate', value: date })}
                    disableBefore={moment().subtract(12, 'months')}
                    disableAfter={moment().add(12, 'months')}
                    label="Due date"
                  />
                )}
                <Assignee
                  value={assigneeId}
                  updateTicketField={updateTicketField}
                  updateTicketHistory={updateTicketHistory}
                />
                <Priority
                  value={issuePriority}
                  updateTicketField={updateTicketField}
                  updateTicketHistory={updateTicketHistory}
                />
                <Reporter
                  value={reporterId}
                  projectId={projectInfo._id}
                  updateTicketField={updateTicketField}
                  updateTicketHistory={updateTicketHistory}
                />
                {isEpic && (
                  <Colors
                    value={ticket.issueColor}
                    updateTicketField={updateTicketField}
                  />)}
                <Diviser />
                <Dates createAt={createdAt} updatedAt={updatedAt} completedAt={completedAt} />
              </Fieldset>
            </Right>
          </Content>
        </Wrapper>
      </Container>
    </ModalContainer>
  )
}

IssueDetail.propTypes = {
  ticket: PropTypes.object.isRequired,
  projectInfo: PropTypes.object.isRequired,
  linkedIssues: PropTypes.array.isRequired,
  updateTicket: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
  deleteEpicTicket: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

IssueDetail.defaultProps = {
  ticket: {},
  projectInfo: {},
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  projectInfo: selectProjectById(ownProps.currentProjectId),
  ticket: selectTicketByKey(ownProps.location.search),
  linkedIssues: selectTicketsLinkedWithEpic(ownProps.location.search),
});

export default compose(
  withRouter,
  connect(mapStateToProps, { updateTicket, deleteTicket, deleteEpicTicket, updateHistory, setAlert })
)(IssueDetail);