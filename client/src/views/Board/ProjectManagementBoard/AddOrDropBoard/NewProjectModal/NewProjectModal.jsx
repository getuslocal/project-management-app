import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import { selectOrganization } from '../../../../../redux/organizations/organizations.selectors';
import { createNewProject } from '../../../../../redux/projects/projects.actions';
import TextArea from '../../../../../shared/components/Form/TextArea/TextArea';
import Category from '../../../ProjectsBoard/AboutBoard/Category/Category';
import Input from '../../../../../shared/components/Form/Input/Input';
import ReadOnlyInput from '../../../../../shared/components/Form/Input/ReadOnlyInput'
import {
  Container,
  Content,
  Fieldset,
  ModalContainer,
  Title,
  SubmitButton,
  TextButton,
  InnerWrapper,
  ButtonsContainer,
  CustomIcon,
} from './NewProjectModal.style';

const NewProjectModal = ({
  setIsModalOpen,
  organization: { _id: orgId },
  currentUser,
  createNewProject,
}) => {
  const [projectFormValues, setProjectFormValues] = useState({
    key: '',
    name: '',
    description: '',
    category: '',
  });

  const { key, name, description, category } = projectFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...projectFormValues,
      owner: currentUser._id,
      orgId: orgId,
      members: [currentUser._id],
      projectIconUrl: 'https://cdn.pixabay.com/photo/2013/07/13/10/51/football-157930_960_720.png'
    }
    // console.log(formData)
    createNewProject(formData)
    setIsModalOpen(false)
  }

  return (
    <ModalContainer>
      <Container >
        <Content>
          <form onSubmit={handleSubmit}>
            <InnerWrapper>
              <Title>Create Project</Title>
              <Fieldset>
                <Input
                  label="Name*"
                  type="text"
                  name="name"
                  placeholder="Enter a project name"
                  width={200}
                  height={36}
                  maxLength={20}
                  value={name}
                  onChange={(e) => setProjectFormValues({ ...projectFormValues, name: e.target.value })}
                  required
                />
                <Input
                  label="Key*"
                  className="key-input"
                  type="text"
                  name="key"
                  placeholder="TEST"
                  width={110}
                  height={36}
                  value={key}
                  maxLength={10}
                  onChange={(e) => setProjectFormValues({ ...projectFormValues, key: e.target.value.toUpperCase() })}
                  description="The project key is used as the prefix of your project's issue keys (e.g. 'TEST-100'). Choose one that is descriptive and easy to type."
                  required
                />
                <TextArea
                  label="Description"
                  placeholder="Enter project description"
                  type="text"
                  name="key"
                  rows={5}
                  maxLength={250}
                  onChange={(e) => setProjectFormValues({ ...projectFormValues, description: e.target.value })}
                  value={description}
                  required
                />
                <Category
                  currentCategory={category}
                  onChange={(value) => setProjectFormValues({ ...projectFormValues, category: value })}
                />
                <ReadOnlyInput
                  label="Lead"
                  width={300}
                  height={36}
                  renderValue={() => (
                    <Fragment>
                      <CustomIcon type="user-icon" imageUrl={currentUser.pictureUrl} size={24} />
                      {currentUser.name}
                    </Fragment>
                  )}
                  // description="A creator of this project will be a project lead. You can change it anytime later."
                />
              </Fieldset>
            </InnerWrapper>
            <ButtonsContainer>
              <SubmitButton value="Create" type="submit" />
              <TextButton onClick={() => setIsModalOpen(false)}>Cancel</TextButton>
            </ButtonsContainer>
          </form>
        </Content>
      </Container>
    </ModalContainer>
  )
}

NewProjectModal.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  organization: selectOrganization,
  currentUser: selectUser
});

export default connect(mapStateToProps, { createNewProject })(NewProjectModal);