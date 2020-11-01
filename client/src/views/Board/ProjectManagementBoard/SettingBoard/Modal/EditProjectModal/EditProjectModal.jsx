import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrganization } from '../../../../../../redux/organizations/organizations.selectors';
import TextArea from '../../../../../../shared/components/Form/TextArea/TextArea';
import Category from '../Category/Category';
import { updateProject, deleteProject } from '../../../../../../redux/projects/projects.actions';
import Button from '../../../../../../shared/components/Button/Button';
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
import { selectProjectById } from '../../../../../../redux/projects/projects.selectors';

const EditProjectModal = ({
  project,
  updateProject,
  deleteProject,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(project._id, formValues);
    closeModal();
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
                  <Image src={projectIconUrl} />
                  <Button text="Change icon" variant="secondary" type="button" />
                </ProjectIcon>
                <TextArea
                  label="Description"
                  placeholder="Enter project description"
                  type="text"
                  name="key"
                  rows={5}
                  maxLength={250}
                  onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
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
                  width={110}
                  height={36}
                  value={key}
                  onChange={onChange}
                  required
                />
                <Category
                  currentCategory={category}
                  onChange={(value) => setFormValues({ ...formValues, category: value })}
                />
              </Fieldset>
            </InnerWrapper>
            <ButtonsContainer>
              <Button
                text="Delete"
                type="button"
                variant="danger"
                onClick={() => {
                  deleteProject(project._id);
                  closeModal();
                }}
                style={{
                  float: 'left'
                }}
              />
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

};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  organization: selectOrganization,
  project: selectProjectById(ownProps.projectId)
});

export default connect(mapStateToProps, { updateProject, deleteProject })(EditProjectModal);