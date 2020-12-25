import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import styled from 'styled-components';
import {
  ModalContainer,
  Container,
  Blanket,
  Wrapper,
  Content,
  Title,
  Options,
} from '../Modal.style';

const ConfirmationModal = ({ title, onClick, closeModal }) => {
  return (
    <ModalContainer>
      <Blanket />
      <Container>
        <Wrapper>
          <Content modalWidth={500}>
            <Title>{title}</Title>
            <Warning>This action cannot be undone.</Warning>
            <Options>
              <Button text="Delete" variant="danger" onClick={onClick} />
              <Button
                text="Cancel"
                variant="secondary"
                type="button"
                onClick={closeModal}
              />
            </Options>
          </Content>
        </Wrapper>
      </Container>
    </ModalContainer>
  );
};

const Warning = styled.p`
  margin: 20px 0;
  font-size: 14px;
`;

ConfirmationModal.defaultProps = {
  title: '',
  onClick: () => {},
  closeModal: () => {},
};

ConfirmationModal.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ConfirmationModal;
