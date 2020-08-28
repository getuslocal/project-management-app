import React, { useState } from 'react';
import { IssueTypes, IssuePriorities } from '../../../../../shared/constants/issues';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectAllProjects } from '../../../../../redux/projects/projects.selectors';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../../../../../shared/components/CustomForm/FormSelectMenu/FormSelectMenu';
import FormInput from '../../../../../shared/components/CustomForm/FormInput/FormInput';
import FormTextArea from '../../../../../shared/components/CustomForm/FormTextArea/FormTextArea';
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

const NewIssueModal = ({ setIsNewIssueModalOpen, projects, currentProjectId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issueFormValues, setIssueFormValues] = useState({
    project: {
      id: currentProjectId,
      name: projects[currentProjectId].name
    },
    IssueType: IssueTypes.TASK,
    summary: '',
    description: '',
    reporterId: '5f30dc2beca63d3ceae1599b',
    assigneeId: 'Unassigned',
    IssuePriority: IssuePriorities.MEDIUM
  });
  const { project, IssueType, summary, description, reporterId, assigneeId, IssuePriority } = issueFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    // submitIssue({ name, email, password, role });
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
          <form>
            <Fieldset>
              <FormSelectMenu
                label="Project"
                name="project"
                value={project.name}
                width="40%"
                selectList={{ ...projects, [project.id]: undefined }}
                handleModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleSelectMenu={handleSelectMenu}
                required
              />
              <FormSelectMenu
                label="Issue Type"
                name="IssueType"
                width="40%"
                value={IssueType}
                selectList={{ ...IssueTypes, [IssueType.toUpperCase()]: undefined }}
                handleModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleSelectMenu={handleSelectMenu}
                description="Some issue types are unavailable due to incompatible field configuration and/or workflow associations."
                required
              />
              <FormSelectMenu
                label="Priority"
                name="IssuePriority"
                value={IssuePriority}
                width="40%"
                selectList={{ ...IssuePriorities, [IssuePriority.toUpperCase()]: undefined }}
                handleModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleSelectMenu={handleSelectMenu}
                description="Priority in relation to other issues."
                required
              />
              <Diviser />
              <FormInput
                label="Summary"
                type="text"
                name="summary"
                value={summary}
                handleChange={handleChange}
                required
              />
              <FormTextArea
                label="Description"
                rows="12"
                name="description"
                value={description}
                handleChange={handleChange}
                required
              />
              <FormSelectMenu
                label="Assignee"
                name="assignee"
                value={assigneeId}
                width="60%"
                selectList={{}}
                handleModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleSelectMenu={handleSelectMenu}
                required
              />
              <FormInput
                label="Reporter"
                type="text"
                name="reporterId"
                width="60%"
                value={reporterId}
                handleChange={handleChange}
                description="Start typing to get a list of possible matches."
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
