import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  ModalContainer,
  MainContent,
  Blanket,
  ButtonsContainer,
  SubmitButton,
  FormContainer,
  Fieldset,
  FormLeftContent,
  FormRightContent,
  Diviser,
  TopFixedContent,
  TicketKey,
  TicketHistoryContent
} from './TicketModal.style';
import FormSelectMenu from '../../../../../../../../shared/components/CustomForm/FormSelectMenu/FormSelectMenu';
import { IssueTypes, IssuePriorities } from '../../../../../../../../shared/constants/issues';
import { selectMembersByProjectId } from '../../../../../../../../redux/members/members.selectors';
import { selectProjectById } from '../../../../../../../../redux/projects/projects.selectors';
import FormInput from '../../../../../../../../shared/components/CustomForm/FormInput/FormInput';
import FormTextArea from '../../../../../../../../shared/components/CustomForm/FormTextArea/FormTextArea';
import { updateTicket } from '../../../../.././../../../redux/tickets/tickets.actions';
import store from '../../../../.././../../../redux/store';

const TicketModal = ({ ticket, setIsModalOpen, DeleteTicket, membersList, projectInfo, columnId, ...props }) => {
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [issueFormValues, setIssueFormValues] = useState({
    issueType: ticket.issueType,
    issueStatus: columnId,
    summary: ticket.summary,
    description: ticket.description,
    reporterId: ticket.reporterId,
    assigneeId: ticket.assigneeId,
    issuePriority: ticket.issuePriority
  });
  const { issueType, issueStatus, summary, description, reporterId, assigneeId, issuePriority } = issueFormValues;
  const columnsList = projectInfo.columns;

  const handleSubmit = (e) => {
    e.preventDefault();
    const columnMove = {
      beforeColumn: columnId,
      afterColumn: issueStatus
    }
    store.dispatch(updateTicket(columnMove, ticket._id, issueFormValues));
    setIsModalOpen(false);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleSelectMenu = (name, value) => {
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  // console.log(ticket)

  return (
    <ModalContainer onClick={() => { if (isSmallModalOpen) setIsSmallModalOpen(false); }}>
      <Blanket onClick={() => setIsModalOpen(false)} />
      <MainContent>
        <TopFixedContent>
          <TicketKey className={`icon-issue-${issueType.toLowerCase()}`}>{ticket.key}</TicketKey>
          <i className="far fa-trash-alt" onClick={DeleteTicket}></i>
          <i className="fas fa-times" onClick={() => setIsModalOpen(false)}></i>
        </TopFixedContent>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <FormLeftContent>
              <Fieldset>
                <FormInput
                  type="text"
                  name="summary"
                  value={summary}
                  width="90%"
                  backgroundStyle="transparent"
                  theme="issueSummary"
                  handleChange={handleChange}
                />
                <FormTextArea
                  label="Description"
                  type="text"
                  name="description"
                  value={description}
                  rows="12"
                  width="90%"
                  backgroundStyle="transparent"
                  theme="issueDescription"
                  handleChange={handleChange}
                />
                <p>Comments</p>
              </Fieldset>
            </FormLeftContent>
            <FormRightContent>
              <Fieldset>
                <FormSelectMenu
                  name="issueStatus"
                  value={columnsList[issueStatus].title}
                  width="180px"
                  selectList={{ ...columnsList, [issueStatus]: undefined }}
                  handleModalOpen={setIsSmallModalOpen}
                  isModalOpen={isSmallModalOpen}
                  handleSelectMenu={handleSelectMenu}
                  renderValue="title"
                  returnValue="id"
                  hasIcon={false}
                  theme="issueStatus"
                  required
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
                  hasIcon={true}
                  backgroundStyle="transparent"
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
                  backgroundStyle="transparent"
                  hasIcon={true}
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
                  backgroundStyle="transparent"
                  hasIcon={true}
                  required
                />
                <Diviser />
                <TicketHistoryContent>
                  <p>Created July 25, 2020, 10:55 PM</p>
                  <p>Updated 18 minutes ago</p>
                </TicketHistoryContent>
              </Fieldset>
            </FormRightContent>
          </FormContainer>
          <ButtonsContainer>
            <SubmitButton value="Update" type="submit" />
          </ButtonsContainer>
        </form>
      </MainContent>
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