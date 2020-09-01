import React, { useState } from 'react';
import { IssueTypes, IssuePriorities } from '../../../../../shared/constants/issues';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectAllProjects } from '../../../../../redux/projects/projects.selectors';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../../../../../shared/components/CustomForm/FormSelectMenu/FormSelectMenu';
import FormInput from '../../../../../shared/components/CustomForm/FormInput/FormInput';
import FormTextArea from '../../../../../shared/components/CustomForm/FormTextArea/FormTextArea';
import store from '../../../../../redux/store';
import { createNewTicket } from '../../../../../redux/tickets/tickets.actions';
import {
  ModalContainer,
  MainContent,
  Title,
  FormContainer,
  Fieldset,
  Diviser,
  ButtonsContainer,
  SubmitButton,
  TextButton
} from './NewIssueModal.style';

const NewIssueModal = ({ setIsNewIssueModalOpen, projects, currentProjectId, membersList, userProfile, ticketsLength}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issueFormValues, setIssueFormValues] = useState({
    projectId: currentProjectId,
    issueType: IssueTypes.TASK,
    summary: '',
    description: '',
    reporterId: userProfile._id,
    assigneeId: '',
    issuePriority: IssuePriorities.MEDIUM
  });
  const { projectId, issueType, summary, description, reporterId, assigneeId, issuePriority } = issueFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectKey = projects[currentProjectId].key;
    const key = projectKey + '-' + ticketsLength;
    issueFormValues.key = key
    store.dispatch(createNewTicket(issueFormValues));
    setIsNewIssueModalOpen(false);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleSelectMenu = (name, value) => {
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  return (
    <ModalContainer onClick={() => { if (isModalOpen) setIsModalOpen(false); }}>
      <MainContent>
        <Title>Create issue</Title>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <Fieldset>
              <FormSelectMenu
                label="Project*"
                name="projectId"
                value={projects[projectId].name}
                width="40%"
                selectList={{ ...projects, [projectId]: undefined }}
                handleModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleSelectMenu={handleSelectMenu}
                renderValue='name'
                returnValue="_id"
                hasIcon={true}
                required
              />
              <FormSelectMenu
                label="Issue Type*"
                name="issueType"
                value={issueType}
                width="40%"
                selectList={{ ...IssueTypes, [issueType.toUpperCase()]: undefined }}
                handleModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleSelectMenu={handleSelectMenu}
                hasIcon={true}
                description="Some issue types are unavailable due to incompatible field configuration and/or workflow associations."
                required
              />
              <FormSelectMenu
                label="Priority"
                name="issuePriority"
                value={issuePriority}
                width="40%"
                hasIcon={true}
                selectList={{ ...IssuePriorities, [issuePriority.toUpperCase()]: undefined }}
                handleModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleSelectMenu={handleSelectMenu}
                description="Priority in relation to other issues."
              />
              <Diviser />
              <FormInput
                label="Summary*"
                type="text"
                name="summary"
                value={summary}
                handleChange={handleChange}
                required
              />
              <FormTextArea
                label="Description*"
                rows="12"
                name="description"
                value={description}
                handleChange={handleChange}
                required
              />
              <FormSelectMenu
                label="Assignee"
                name="assigneeId"
                value={assigneeId ? membersList[assigneeId].name : 'Unassigned'}
                width="60%"
                selectList={{ ...membersList, [assigneeId]: undefined }}
                handleModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleSelectMenu={handleSelectMenu}
                renderValue="name"
                returnValue="_id"
                hasIcon={true}
              />
              <FormSelectMenu
                label="Reporter*"
                name="reporterId"
                value={membersList[reporterId].name}
                width="60%"
                selectList={{ ...membersList, [reporterId]: undefined }}
                handleModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleSelectMenu={handleSelectMenu}
                renderValue='name'
                returnValue="_id"
                description="Start typing to get a list of possible matches."
                hasIcon={true}
                required
              />
              <ButtonsContainer>
                <SubmitButton value="Create" type="submit" />
                <TextButton onClick={() => setIsNewIssueModalOpen(false)}>Cancel</TextButton>
              </ButtonsContainer>
            </Fieldset>
          </form>
        </FormContainer>
      </MainContent>
    </ModalContainer>
  )
}

NewIssueModal.propTypes = {
  projects: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projects: selectAllProjects,
});

export default connect(mapStateToProps, null)(NewIssueModal);
