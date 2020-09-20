import React, { useState } from 'react';
import { IssueTypes, IssuePriorities, IssueColors } from '../../../../../shared/constants/issues';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectAllProjects } from '../../../../../redux/projects/projects.selectors';
import { createStructuredSelector } from 'reselect';
import FormSelectMenu from '../Form/FormSelectMenu/FormSelectMenu';
import FormInput from '../Form/FormInput/FormInput';
import FormTextArea from '../Form/FormTextArea/FormTextArea';
import ChildIssueMenu from '../Form/ChildIssueMenu/ChildIssueMenu';
import DatePicker from '../Form/DatePicker/DatePicker';
import store from '../../../../../redux/store';
import { createNewTicket } from '../../../../../redux/tickets/tickets.actions';
import {
  ModalContainer,
  Container,
  Content,
  Title,
  Fieldset,
  Diviser,
  ButtonsContainer,
  SubmitButton,
  TextButton,
  InnerWrapper
} from './NewIssueModal.style';
import moment from 'moment';

const NewIssueModal = ({ setIsModalActive, projects, currentProjectId, membersList, userProfile, renderStyle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEpicModal = (renderStyle === "RoadMapBoard");
  const [issueFormValues, setIssueFormValues] = useState({
    projectId: currentProjectId,
    issueType: isEpicModal ? IssueTypes.EPIC : IssueTypes.TASK,
    summary: '',
    description: '',
    reporterId: userProfile._id,
    assigneeId: '',
    issuePriority: IssuePriorities.MEDIUM,
    issueColor: isEpicModal ? IssueColors.PURPLE : null,
    childIssues: []
  });
  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null
  });

  const { projectId, issueType, summary, description, reporterId, assigneeId, issuePriority, issueColor, childIssues } = issueFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isEpicModal && (dateRange.startDate === null || dateRange.endDate === null)) {
      alert('Please choose start and due dates')
      return
    }
    // console.log(dateRange.startDate.toJSON())
    store.dispatch(createNewTicket({ ...issueFormValues, dateRange }));
    setIsModalActive(false);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleSelectMenu = (name, value) => {
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleChildIssueMenu = (value, isActive = false) => {
    if (isActive) {
      setIssueFormValues({ ...issueFormValues, childIssues: childIssues.filter(issue => issue._id !== value._id) });
      return
    }
    setIssueFormValues({ ...issueFormValues, childIssues: [...childIssues, value] });
  };

  return (
    <ModalContainer onClick={() => { if (isModalOpen) setIsModalOpen(false); }}>
      <Container>
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
                  handleModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
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
                  selectList={isEpicModal ? {} : { ...IssueTypes, [issueType.toUpperCase()]: undefined }}
                  handleModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
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
                  handleModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                  handleSelectMenu={handleSelectMenu}
                  iconStyle={{ base: 'priority', type: issuePriority, size: '12px' }}
                  description="Priority in relation to other issues."
                />
                {
                  isEpicModal && <DatePicker setdateRange={setdateRange} dateRange={dateRange} />
                }
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
                {
                  isEpicModal && (
                    <>
                      <ChildIssueMenu
                        label="Child issues"
                        name="childIssues"
                        childIssues={childIssues}
                        handleModalOpen={setIsModalOpen}
                        handleSelectMenu={handleSelectMenu}
                        isModalOpen={isModalOpen}
                        handleChildIssueMenu={handleChildIssueMenu}
                      />
                      <FormSelectMenu
                        label="Issue color"
                        name="issueColor"
                        value={issueColor.name}
                        width="30%"
                        selectList={{ ...IssueColors, [issueColor.name.toUpperCase()]: undefined }}
                        handleModalOpen={setIsModalOpen}
                        isModalOpen={isModalOpen}
                        handleSelectMenu={handleSelectMenu}
                        renderValue="name"
                        iconStyle={{
                          base: 'issueColor',
                          type: issueColor.name,
                          size: '11px',
                          renderValue: 'name'
                        }}
                      />
                    </>
                  )
                }

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
                  iconStyle={{
                    base: 'userIcon',
                    type: assigneeId ? membersList[assigneeId].pictureUrl : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png',
                    size: '25px',
                    renderValue: 'pictureUrl'
                  }}
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
                  iconStyle={{
                    base: 'userIcon',
                    type: membersList[reporterId].pictureUrl,
                    size: '25px',
                    renderValue: 'pictureUrl'
                  }}
                  required
                />

              </Fieldset>
            </InnerWrapper>
            <ButtonsContainer isEpicModal={isEpicModal}>
              <SubmitButton value="Create" type="submit" />
              <TextButton onClick={() => setIsModalActive(false)}>Cancel</TextButton>
            </ButtonsContainer>
          </form>
        </Content>
      </Container>

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
