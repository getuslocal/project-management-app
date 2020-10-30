import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import { selectOrganization } from '../../../../../redux/organizations/organizations.selectors';
import { createNewProject } from '../../../../../redux/projects/projects.actions';
import TextArea from '../../../../../shared/components/Form/TextArea/TextArea';
import store from '../../../../../redux/store'
import Owner from './Owner/Owner';
import Category from './Category/Category';
import { updateProject } from '../../../../../redux/projects/projects.actions';
import Button from '../../../../../shared/components/Button/Button';
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
  CustomInput,
  ProjectIcon,
  Image
} from './EditProjectModal.style';

const EditProjectModal = ({
  setIsModalOpen,
  project,
}) => {
  const [formValues, setFormValues] = useState({
    name: project.name,
    key: project.key,
    owner: project.owner,
    description: project.description,
    category: project.category,
    projectIconUrl: project.projectIconUrl,
  });
  const { name, key, owner, description, category, projectIconUrl } = formValues

  const onChange = event => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    store.dispatch(updateProject(project._id, formValues))
  }

  return (
    <ModalContainer>
      <Container >
        <Content>
          <form onSubmit={handleSubmit}>
            <InnerWrapper>
              <Title>Edit Project</Title>
              <Fieldset>
                <ProjectIcon imageUrl={projectIconUrl} >
                  <Image src={projectIconUrl} />
                  <Button text="Change icon" variant="secondary" />
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
                <CustomInput
                  label="Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
                <CustomInput
                  label="Key"
                  type="text"
                  name="key"
                  width={200}
                  value={key}
                  onChange={onChange}
                  required
                />
                <Owner
                  owner={owner}
                  onChange={(value) => setFormValues({ ...formValues, owner: value })}
                />
                <Category
                  currentCategory={category}
                  onChange={(value) => setFormValues({ ...formValues, category: value })}
                />
              </Fieldset>
            </InnerWrapper>
            <ButtonsContainer>
              <SubmitButton value="Update" type="submit" />
              <TextButton onClick={() => setIsModalOpen(false)}>Cancel</TextButton>
            </ButtonsContainer>
          </form>
        </Content>
      </Container>
    </ModalContainer>
  )
}

EditProjectModal.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  organization: selectOrganization,
  currentUser: selectUser
});

export default connect(mapStateToProps, { createNewProject })(EditProjectModal);