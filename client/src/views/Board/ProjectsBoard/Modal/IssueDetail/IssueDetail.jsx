import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectProjectById } from '../../../../../redux/projects/projects.selectors';
import {
  updateTicket,
  deleteTicket,
  deleteEpicTicket,
} from '../../../../../redux/tickets/tickets.actions';
import { updateHistory } from '../../../../../redux/projects/projects.actions';
import {
  selectTicketByKey,
  selectTicketsLinkedWithEpic,
} from '../../../../../redux/tickets/tickets.selectors';
import {
  IssueHistoryTypes,
  IssueTypes,
} from '../../../../../shared/constants/issues';
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
import { Content, Blanket, Left, Right, Wrapper } from './IssueDetail.style';
import { ModalContainer, Container, Fieldset, Diviser } from '../Modal.style';
import { setAlert } from '../../../../../redux/alert/alert.actions';
import Modal from '../../../../../shared/components/Modal/Modal';
import Button from '../../../../../shared/components/Button/Button';
import ConfirmationModal from '../../../../../shared/components/Modal/ConfirmationModal/ConfirmationModal';

const getColumnIdOfTicket = (columns, ticketId) => {
  const foundColumn = Object.values(columns).find((column) =>
    column.taskIds.includes(ticketId)
  );
  if (foundColumn) return foundColumn.id;
  else return null;
};

const IssueDetail = ({
  ticket,
  project,
  deleteTicket,
  deleteEpicTicket,
  updateTicket,
  linkedIssues,
  updateHistory,
  setAlert,
  ...props
}) => {
  // Close modal by removing query string of selectedIssue.
  const closeModal = () => {
    props.history.push(props.match.url);
  };

  // Check if the issue does not exist.
  if (ticket === null) {
    return (
      <Modal
        title="This issue does not exist."
        renderOptions={() => (
          <Button text="Back" variant="primary" onClick={closeModal} />
        )}
      />
    );
  }

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
    dueDate,
  } = ticket;

  const isEpic = ticket.issueType === IssueTypes.EPIC;
  const [childIssues, setChildIssues] = useState(linkedIssues);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const updateTicketField = (updatedValue) => {
    // Update ticket.
    updateTicket(ticket._id, updatedValue);
  };

  // Update history of project.
  const updateTicketHistory = (
    field,
    beforeValue,
    afterValue,
    type = IssueHistoryTypes.UPDATE
  ) => {
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
    };
    updateHistory(project._id, logData);
  };

  // Delete Ticket
  const handleDeleteTicket = () => {
    if (isEpic) {
      deleteEpicTicket(ticketId, childIssues);
    } else {
      const columnId = getColumnIdOfTicket(project.columns, ticketId);
      deleteTicket(ticketId, columnId);
    }
    // Close Modal.
    closeModal();
    // Attach a success alert.
    setAlert(
      `${project.key}-${ticket.key} is deleted successfully.`,
      'success'
    );
  };

  return (
    <Fragment>
      <ModalContainer>
        <Blanket onClick={closeModal} />
        <Container style={{ backgroundColor: 'unset' }}>
          <Wrapper>
            <Header
              linkedEpic={linkedEpic}
              ticketKey={key}
              projectKey={project.key}
              issueType={issueType}
              closeModal={closeModal}
              setConfirmationModal={setConfirmationModal}
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
                      projectKey={project.key}
                    />
                  )}
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
                      columns={project.columns}
                      columnOrder={project.columnOrder}
                      projectId={project._id}
                      ticket={ticket}
                      updateTicketHistory={updateTicketHistory}
                    />
                  ) : (
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
                      onDateChange={(date) =>
                        updateTicketField({ field: 'dueDate', value: date })
                      }
                      disableBefore={moment().subtract(12, 'months')}
                      disableAfter={moment().add(12, 'months')}
                      label="Due date"
                    />
                  )}
                  <Assignee
                    value={assigneeId}
                    projectMembersList={project.members}
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
                    projectMembersList={project.members}
                    projectId={project._id}
                    updateTicketField={updateTicketField}
                    updateTicketHistory={updateTicketHistory}
                  />
                  {isEpic && (
                    <Colors
                      value={ticket.issueColor}
                      updateTicketField={updateTicketField}
                    />
                  )}
                  <Diviser />
                  <Dates
                    createAt={createdAt}
                    updatedAt={updatedAt}
                    completedAt={completedAt}
                  />
                </Fieldset>
              </Right>
            </Content>
          </Wrapper>
        </Container>
      </ModalContainer>
      {confirmationModal && (
        <ConfirmationModal
          title={`Are you sure you want to delete this ${
            isEpic ? 'epic' : 'issue'
          } ?`}
          onClick={handleDeleteTicket}
          closeModal={() => setConfirmationModal(false)}
        />
      )}
    </Fragment>
  );
};

IssueDetail.propTypes = {
  ticket: PropTypes.object,
  project: PropTypes.object.isRequired,
  linkedIssues: PropTypes.array.isRequired,
  updateTicket: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
  deleteEpicTicket: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    project: selectProjectById(ownProps.currentProjectId),
    ticket: selectTicketByKey(ownProps.location.search),
    linkedIssues: selectTicketsLinkedWithEpic(ownProps.location.search),
  });

export default compose(
  withRouter,
  connect(mapStateToProps, {
    updateTicket,
    deleteTicket,
    deleteEpicTicket,
    updateHistory,
    setAlert,
  })
)(IssueDetail);
