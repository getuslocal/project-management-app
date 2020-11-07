import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TextArea from '../../../../../../shared/components/Form/TextArea/TextArea';
import { selectProjectById } from '../../../../../../redux/projects/projects.selectors';
import Category from '../Category/Category';
import { updateProject } from '../../../../../../redux/projects/projects.actions';
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

const EditProjectModal = ({
  project,
  updateProject,
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
  updateProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  project: selectProjectById(ownProps.projectId)
});

export default connect(mapStateToProps, { updateProject })(EditProjectModal);