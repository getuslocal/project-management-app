import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProjectById } from '../../../../../../redux/projects/projects.selectors';
import { updateTicket, deleteTicket } from '../../../../../../redux/tickets/tickets.actions';
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
import DatePicker from '../../Form/DatePicker/DatePicker';
import ChildissueMenu from '../../Form/ChildIssueMenu/ChildIssueMenu';
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

const IssueDetail = ({
  ticket,
  linkedEpic,
  columnId,
  setIsModalOpen,
  projectInfo,
  deleteTicket,
  updateTicket,
  isEpic
}) => {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
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
    updatedAt
  } = ticket;
  console.log(ticket.issueColor)

  const updateTicketField = (updatedValue) => {
    updateTicket(ticket._id, updatedValue);
  }

  return (
    <ModalContainer onClick={() => { if (isSelectMenuOpen) setIsSelectMenuOpen(false); }}>
      <Blanket onClick={() => setIsModalOpen(false)} />
      <Container>
        <Wrapper>
          <Header
            linkedEpic={linkedEpic}
            ticketKey={key}
            issueType={issueType}
            handleDeleteTicket={() => deleteTicket(ticketId, columnId)}
            setIsModalOpen={setIsModalOpen}
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
                {/* {isEpic && (
                  <ChildissueMenu
                    isEpicTicket={true}
                    childIssues={ticket.childIssues}
                    updateTicketField={updateTicketField}
                  />)} */}
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
                    value={columnId}
                    columns={projectInfo.columns}
                    columnOrder={projectInfo.columnOrder}
                    projectId={projectInfo._id}
                    ticketId={ticketId}
                  />
                ) : (
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
                  />
                )}
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
  linkedEpic: PropTypes.object,
  columnId: PropTypes.string,
  setIsModalOpen: PropTypes.func.isRequired,
  projectInfo: PropTypes.object.isRequired,
  updateTicket: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
};

IssueDetail.defaultProps = {
  ticket: {},
  linkedEpic: {},
  columnId: "",
  projectInfo: {},
  isEpic: false,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  projectInfo: selectProjectById(ownProps.currentProjectId)
});


export default connect(mapStateToProps, { updateTicket, deleteTicket })(IssueDetail);