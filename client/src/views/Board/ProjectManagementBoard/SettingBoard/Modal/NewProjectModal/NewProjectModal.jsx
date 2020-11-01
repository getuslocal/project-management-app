import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrganization } from '../../../../../../redux/organizations/organizations.selectors';
import { createNewProject } from '../../../../../../redux/projects/projects.actions';
import TextArea from '../../../../../../shared/components/Form/TextArea/TextArea';
import { projectCategories } from '../../../../../../shared/constants/projects';
import Category from '../Category/Category';
import Input from '../../../../../../shared/components/Form/Input/Input';
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
} from './NewProjectModal.style';

const NewProjectModal = ({
  setIsModalOpen,
  organization: { _id: orgId },
  createNewProject,
}) => {
  const [projectFormValues, setProjectFormValues] = useState({
    key: '',
    name: '',
    description: '',
    category: projectCategories.BUSINESS,
  });

  const { key, name, description, category, } = projectFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...projectFormValues,
      orgId: orgId,
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
          <Title>Create Project</Title>
          <form onSubmit={handleSubmit}>
            <InnerWrapper>
              <Fieldset>
                <Input
                  label="Name*"
                  type="text"
                  name="name"
                  placeholder="Enter a project name"
                  width={350}
                  height={36}
                  maxLength={35}
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
});

export default connect(mapStateToProps, { createNewProject })(NewProjectModal);