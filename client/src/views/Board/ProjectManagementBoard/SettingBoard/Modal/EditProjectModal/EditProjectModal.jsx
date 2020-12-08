import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TextArea from '../../../../../../shared/components/Form/TextArea/TextArea';
import { selectProjectById, selectProjects } from '../../../../../../redux/projects/projects.selectors';
import Category from '../Category/Category';
import { updateProjectAndRoles } from '../../../../../../redux/projects/projects.actions';
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
  ProjectIcon,
  Image
} from './EditProjectModal.style';
import ImageFileUpload from '../../../../../../shared/components/Form/ImageFileUpload/ImageFileUpload';
import { setAlert } from '../../../../../../redux/alert/alert.actions';

const EditProjectModal = ({
  project,
  updateProjectAndRoles,
  setAlert,
  projectList,
  ...props
}) => {
  const [formValues, setFormValues] = useState({
    name: project.name,
    key: project.key,
    description: project.description,
    category: project.category,
    projectIconUrl: project.projectIconUrl,
  });
  const { name, key, description, category, projectIconUrl } = formValues

  const onChange = event => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

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

    // Update project and roles state.
    updateProjectAndRoles(project._id, formValues);
    // Close modal.
    closeModal();
    // Attach an alert.
    setAlert(`${project.name} has been updated!`, 'success');
  }

  const closeModal = () => {
    props.history.push(props.match.url)
  }

  return (
    <ModalContainer>
      <Container >
        <Content>
          <Title>Edit Project</Title>
          <form onSubmit={handleSubmit}>
            <InnerWrapper>
              <Fieldset>
                <ProjectIcon imageUrl={projectIconUrl} >
                  <Image src={projectIconUrl} alt="project icon" />
                  <ImageFileUpload
                    id="project_image"
                    text="Change project icon"
                    accept="image/png,image/jpeg"
                    name="project_image"
                    description="* File format: png or jpeg."
                    onChange={fileUrl => setFormValues({ ...formValues, projectIconUrl: fileUrl })}
                  />
                </ProjectIcon>
                <TextArea
                  label="Description"
                  placeholder="Enter project description"
                  type="text"
                  name="description"
                  rows={5}
                  maxLength={250}
                  onChange={onChange}
                  value={description}
                  required
                />
                <Input
                  label="Name*"
                  type="text"
                  name="name"
                  width={350}
                  height={36}
                  maxLength={35}
                  value={name}
                  onChange={onChange}
                  required
                />
                <Input
                  label="Key*"
                  type="text"
                  name="key"
                  width={130}
                  height={36}
                  maxLength={10}
                  value={key}
                  onChange={(e) => setFormValues({ ...formValues, key: e.target.value.toUpperCase() })}
                  style={{ textTransform: 'uppercase' }}
                  required
                />
                <Category
                  currentCategory={category}
                  onChange={(value) => setFormValues({ ...formValues, category: value })}
                />
              </Fieldset>
            </InnerWrapper>
            <ButtonsContainer>
              <SubmitButton value="Update" type="submit" />
              <TextButton onClick={() => closeModal()}>Cancel</TextButton>
            </ButtonsContainer>
          </form>
        </Content>
      </Container>
    </ModalContainer>
  )
}

EditProjectModal.propTypes = {
  project: PropTypes.object.isRequired,
  projectList: PropTypes.object.isRequired,
  updateProjectAndRoles: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  project: selectProjectById(ownProps.projectId),
  projectList: selectProjects
});

export default connect(mapStateToProps, { updateProjectAndRoles, setAlert })(EditProjectModal);