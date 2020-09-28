import React, { useState } from 'react';
import { IssueTypes, IssuePriorities, IssueColors } from '../../../../../../../shared/constants/issues';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProjects } from '../../../../../../../redux/projects/projects.selectors';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../../../Form/FormSelectMenu/FormSelectMenu';
import FormInput from '../../../Form/FormInput/FormInput';
import FormTextArea from '../../../Form/FormTextArea/FormTextArea';
import ChildIssueMenu from '../../../Form/ChildIssueMenu/ChildIssueMenu';
import RangedDatePicker from '../../../Form/RangedDatePicker/RangedDatePicker';
import { createNewEpicTicket } from '../../../../../../../redux/tickets/tickets.actions';
import {
  Title,
  SubmitButton,
  TextButton,
  InnerWrapper,
  ButtonsContainer,
} from './NewEpicModal.style';
import {
  Container,
  Content,
  Fieldset,
  Diviser,
} from '../../Modal.style';

const NewEpicModal = ({
  setIsModalOpen,
  projects,
  currentProjectId,
  membersList,
  userProfile,
  createNewEpicTicket,
  defaultStartDate
}) => {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [issueFormValues, setIssueFormValues] = useState({
    projectId: currentProjectId,
    issueType: IssueTypes.EPIC,
    summary: '',
    description: '',
    reporterId: userProfile._id,
    assigneeId: '',
    issuePriority: IssuePriorities.MEDIUM,
    issueColor: IssueColors.PURPLE.name,
  });

  const [childIssues, setChildIssues] = useState([])

  const [dateRange, setdateRange] = useState({
    startDate: defaultStartDate,
    endDate: null
  });

  const { projectId, issueType, summary, description, reporterId, assigneeId, issuePriority, issueColor } = issueFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewEpicTicket({ ...issueFormValues, dateRange }, childIssues);
    setIsModalOpen(false);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleSelectMenu = (name, value) => {
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleChildIssueMenu = (issueId, isActive = false) => {
    if (isActive) {
      setChildIssues(childIssues.filter(issue => issue !== issueId));
      return
    }
    setChildIssues([...childIssues, issueId]);
  };

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
                selectList={{}}
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
              <RangedDatePicker setdateRange={setdateRange} dateRange={dateRange} />
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
              <ChildIssueMenu
                label="Child issues"
                name="childIssues"
                childIssues={childIssues}
                setIsSelectMenuOpen={setIsSelectMenuOpen}
                handleSelectMenu={handleSelectMenu}
                isSelectMenuOpen={isSelectMenuOpen}
                handleChildIssueMenu={handleChildIssueMenu}
              />
              <FormSelectMenu
                label="Issue color"
                name="issueColor"
                value={issueColor}
                width="30%"
                selectList={{ ...IssueColors, [issueColor.toUpperCase()]: undefined }}
                setIsSelectMenuOpen={setIsSelectMenuOpen}
                isSelectMenuOpen={isSelectMenuOpen}
                handleSelectMenu={handleSelectMenu}
                renderValue="name"
                returnValue="name"
                iconStyle={{
                  base: 'issueColor',
                  type: issueColor,
                  size: '11px',
                  renderValue: 'name'
                }}
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
          <ButtonsContainer isEpicModal={true}>
            <SubmitButton value="Create" type="submit" />
            <TextButton onClick={() => setIsModalOpen(false)}>Cancel</TextButton>
          </ButtonsContainer>
        </form>
      </Content>
    </Container>
  )
}

NewEpicModal.propTypes = {
  projects: PropTypes.object.isRequired,
  createNewEpicTicket: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projects: selectProjects,
});

export default connect(mapStateToProps, { createNewEpicTicket })(NewEpicModal);
