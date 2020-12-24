import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNewProject } from '../../../../../../redux/projects/projects.actions';
import TextArea from '../../../../../../shared/components/Form/TextArea/TextArea';
import { getRandomProjectIcon, projectCategories } from '../../../../../../shared/constants/projects';
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
import { setAlert } from '../../../../../../redux/alert/alert.actions';

const NewProjectModal = ({
  setIsModalOpen,
  organization: { _id: orgId },
  createNewProject,
  projectList,
  setAlert,
}) => {
  const [projectFormValues, setProjectFormValues] = useState({
    key: '',
    name: '',
    description: '',
    category: projectCategories.BUSINESS,
  });

  const { key, name, description, category, } = projectFormValues;

  // Check if the key is duplicated.
  const validateKey = (key, projects) => {
    const duplicatedKey = Object.values(projects).find(project => project.key === key);
    return duplicatedKey ? false : true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateKey(key, projectList);

    if (!isValid) {
      // Set an error alerm.
      setAlert('The key already exists. Please enter different key.', 'error');
      return;
    }

    const formData = {
      ...projectFormValues,
      orgId: orgId,
      projectIconUrl: getRandomProjectIcon()  // default project icon.
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
                  width={130}
                  height={36}
                  value={key}
                  maxLength={10}
                  onChange={(e) => setProjectFormValues({ ...projectFormValues, key: e.target.value.toUpperCase() })}
                  description="The project key is used as the prefix of your project's issue keys (e.g. 'TEST-100'). Choose one that is descriptive and easy to type."
                  required
                />
                <TextArea
                  label="Description*"
                  placeholder="Enter project description"
                  type="text"
                  name="key"
                  rows={5}
                  maxLength={400}
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
  organization: PropTypes.object.isRequired,
  createNewProject: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  organization: state => state.organization,
});

export default connect(mapStateToProps, { createNewProject, setAlert })(NewProjectModal);