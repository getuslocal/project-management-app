import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Input from '../../../../../shared/components/Form/Input/Input';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import { selectOrganization } from '../../../../../redux/organizations/organizations.selectors';
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
} from '../Modal.style';

const ProjectCreate = ({
  setIsModalOpen,
  organization: { _id: orgId },
  currentUser: { name: creator },
}) => {
  const [projectFormValues, setProjectFormValues] = useState({
    key: '',
    name: '',
  });

  const { key, name } = projectFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <ModalContainer>
      <Container onClick={() => { if (isSelectMenuOpen) setIsSelectMenuOpen(false); }}>
        <Content>
          <form onSubmit={handleSubmit}>
            <Title>Create issue</Title>
            <InnerWrapper>
              <Fieldset>
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setProjectFormValues({ ...projectFormValues, name: e.target.value })}
                  required
                />
                <Input
                  label="Key"
                  type="text"
                  name="key"
                  value={key}
                  onChange={(e) => setProjectFormValues({ ...projectFormValues, key: e.target.value })}
                  required
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

ProjectCreate.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  organization: selectOrganization,
  currentUser: selectUser
});

export default connect(mapStateToProps, null)(ProjectCreate);