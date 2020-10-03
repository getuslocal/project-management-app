import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectProjectById } from '../../../../../../redux/projects/projects.selectors';
import { updateTicket, deleteTicket, deleteEpicTicket } from '../../../../../../redux/tickets/tickets.actions';
import { selectTicketByKey, selectTicketsLinkedWithEpic } from '../../../../../../redux/tickets/tickets.selectors';
import { IssueTypes } from '../../../../../../shared/constants/issues'
import Header from './Header/Header';
import Title from './Title/Title';
import Description from './Description/Description';
import Comments from './Comments/Comments';
import Priority from './Priority/Priority';
import Reporter from './Reporter/Reporter';
import Assignee from './Assignee/Assignee';
import Status from './Status/Status';
import Dates from './Dates/Dates';
import Colors from './Colors/Colors';
import Complete from './Complete/Complete';
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
    linkedEpic,
  } = ticket;

  const isEpic = (ticket.issueType === IssueTypes.EPIC);
  const [childIssues, setChildIssues] = useState(linkedIssues);

  const updateTicketField = (updatedValue) => {
    updateTicket(ticket._id, updatedValue);
  }
  const handleDeleteTicket = () => {
    if (isEpic) {
      deleteEpicTicket(ticketId, childIssues)
    } else {
      const columnId = getColumnIdOfTicket(projectInfo.columns, ticketId);
      deleteTicket(ticketId, columnId)
    }
    props.history.push(props.match.url)
  }

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
                />
                <Description
                  currentValue={description}
                  updateTicketField={updateTicketField}
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
                    ticketId={ticketId}
                  />) : (
                    <Fragment>
                      <Complete
                        isEpicDone={ticket.isEpicDone}
                        updateTicketField={updateTicketField}
                      />
                      <DatePicker
                        dateRange={ticket.dateRange}
                        updateTicketField={updateTicketField}
                        isStartDate={true}
                      />
                      <DatePicker
                        dateRange={ticket.dateRange}
                        updateTicketField={updateTicketField}
                        isEndDate={true}
                      />
                    </Fragment>
                  )}
                <Assignee
                  value={assigneeId}
                  updateTicketField={updateTicketField}
                />
                <Priority
                  value={issuePriority}
                  updateTicketField={updateTicketField}
                />
                <Reporter
                  value={reporterId}
                  projectId={projectInfo._id}
                  updateTicketField={updateTicketField}
                />
                {isEpic && (
                  <Colors
                    value={ticket.issueColor}
                    updateTicketField={updateTicketField}
                  />)}
                <Diviser />
                <Dates createAt={createdAt} updatedAt={updatedAt} />
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
  connect(mapStateToProps, { updateTicket, deleteTicket, deleteEpicTicket })
)(IssueDetail);