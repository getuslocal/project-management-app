import React, { useState } from 'react';
import { IssueTypes, IssuePriorities } from '../../../../../../shared/constants/issues';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProjects } from '../../../../../../redux/projects/projects.selectors';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../../Form/FormSelectMenu/FormSelectMenu';
import FormInput from '../../Form/FormInput/FormInput';
import { createNewTicket } from '../../../../../../redux/tickets/tickets.actions';
import Description from './Description/Description';
import {
  Title,
  SubmitButton,
  TextButton,
  InnerWrapper,
  ButtonsContainer,
} from './IssueCreate.style';
import {
  Container,
  Content,
  Fieldset,
  Diviser,
} from '../Modal.style';

const IssueCreate = ({
  setIsModalOpen,
  projects,
  currentProjectId,
  membersList,
  userProfile,
  createNewTicket,
}) => {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [issueFormValues, setIssueFormValues] = useState({
    projectId: currentProjectId,
    issueType: IssueTypes.TASK,
    summary: '',
    description: '',
    reporterId: userProfile._id,
    assigneeId: '',
    issuePriority: IssuePriorities.MEDIUM,
  });

  const { projectId, issueType, summary, description, reporterId, assigneeId, issuePriority } = issueFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set a linked epic null.
    issueFormValues.linkedEpic = null;
    // Create a new ticket with form values.
    // Get first column where a new ticket is added onto.
    const columnId = projects[currentProjectId].columnOrder[0];
    createNewTicket(issueFormValues, columnId);
    // Close this modal.
    setIsModalOpen(false);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleSelectMenu = (name, value) => {
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleEditorText = (text) => {
    setIssueFormValues({ ...issueFormValues, description: text });
  }

  return (
    <Container onClick={() => { if (isSelectMenuOpen) setIsSelectMenuOpen(false); }}>
      <Content>
        <form onSubmit={handleSubmit}>
          <Title>Create issue</Title>
          <InnerWrapper>
            <Fieldset>
              <FormSelectMenu
                label="Project*"
                name="projectId"
                value={projects[projectId].name}
                width="40%"
                selectList={{}}
                setIsSelectMenuOpen={setIsSelectMenuOpen}
                isSelectMenuOpen={isSelectMenuOpen}
                handleSelectMenu={handleSelectMenu}
                renderValue='name'
                returnValue="_id"
                iconStyle={{
                  base: 'projectIcon',
                  type: projects[projectId].projectIconUrl,
                  size: '25px',
                  renderValue: 'projectIconUrl'
                }}
                required
              />
              <FormSelectMenu
                label="Issue Type*"
                name="issueType"
                value={issueType}
                width="40%"
                selectList={{ ...IssueTypes, [issueType.toUpperCase()]: undefined }}
                setIsSelectMenuOpen={setIsSelectMenuOpen}
                isSelectMenuOpen={isSelectMenuOpen}
                handleSelectMenu={handleSelectMenu}
                iconStyle={{ base: 'issue', type: issueType, size: '9px' }}
                description="Some issue types are unavailable due to incompatible field configuration and/or workflow associations."
                required
              />
              <FormSelectMenu
                label="Priority"
                name="issuePriority"
                value={issuePriority}
                width="40%"
                selectList={{ ...IssuePriorities, [issuePriority.toUpperCase()]: undefined }}
                setIsSelectMenuOpen={setIsSelectMenuOpen}
                isSelectMenuOpen={isSelectMenuOpen}
                handleSelectMenu={handleSelectMenu}
                iconStyle={{ base: 'priority', type: issuePriority, size: '12px' }}
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
              <Description
                value={description}
                onChange={handleEditorText}
              />
              <FormSelectMenu
                label="Assignee"
                name="assigneeId"
                value={assigneeId && membersList ? membersList[assigneeId].name : 'Unassigned'}
                width="60%"
                selectList={{ ...membersList, [assigneeId]: undefined }}
                setIsSelectMenuOpen={setIsSelectMenuOpen}
                isSelectMenuOpen={isSelectMenuOpen}
                handleSelectMenu={handleSelectMenu}
                renderValue="name"
                returnValue="_id"
                iconStyle={{
                  base: 'userIcon',
                  type: assigneeId && membersList ? membersList[assigneeId].pictureUrl : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png',
                  size: '25px',
                  renderValue: 'pictureUrl'
                }}
              />
              <FormSelectMenu
                label="Reporter*"
                name="reporterId"
                value={membersList && membersList[reporterId].name}
                width="60%"
                selectList={{ ...membersList, [reporterId]: undefined }}
                setIsSelectMenuOpen={setIsSelectMenuOpen}
                isSelectMenuOpen={isSelectMenuOpen}
                handleSelectMenu={handleSelectMenu}
                renderValue='name'
                returnValue="_id"
                description="Start typing to get a list of possible matches."
                iconStyle={{
                  base: 'userIcon',
                  type: membersList && membersList[reporterId].pictureUrl,
                  size: '25px',
                  renderValue: 'pictureUrl'
                }}
                required
              />
            </Fieldset>
          </InnerWrapper>
          <ButtonsContainer isEpicModal={false}>
            <SubmitButton value="Create" type="submit" />
            <TextButton onClick={() => setIsModalOpen(false)}>Cancel</TextButton>
          </ButtonsContainer>
        </form>
      </Content>
    </Container>
  )
}

IssueCreate.propTypes = {
  projects: PropTypes.object.isRequired,
  createNewTicket: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projects: selectProjects,
});

export default connect(mapStateToProps, { createNewTicket })(IssueCreate);
