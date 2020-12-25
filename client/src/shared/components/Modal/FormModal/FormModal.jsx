import React from 'react';
import PropTypes from 'prop-types';
import {
  ModalContainer,
  Container,
  Blanket,
  Wrapper,
  Content,
  Title,
  Options,
} from '../Modal.style';

const FormModal = ({
  title,
  modalWidth,
  handleSubmit,
  children,
  renderOptions,
}) => {
  return (
    <ModalContainer>
      <Blanket />
      <Container>
        <Wrapper>
          <Content modalWidth={modalWidth}>
            {title && <Title>{title}</Title>}
            <form onSubmit={handleSubmit}>
              {children}
              <Options>{renderOptions()}</Options>
            </form>
          </Content>
        </Wrapper>
      </Container>
    </ModalContainer>
  );
};

FormModal.propTypes = {
  closeModal: PropTypes.func,
};

export default FormModal;
