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
} from './Modal.style';

const Modal = ({
  title,
  modalWidth,
  children,
  renderOptions,
  closeOnBlanket,
}) => {
  return (
    <ModalContainer>
      <Blanket
        onClick={() => {
          if (closeOnBlanket) closeOnBlanket();
        }}
      />
      <Container>
        <Wrapper>
          <Content modalWidth={modalWidth}>
            {title && <Title>{title}</Title>}
            {children}
            <Options>{renderOptions()}</Options>
          </Content>
        </Wrapper>
      </Container>
    </ModalContainer>
  );
};

Modal.defaultProps = {
  title: undefined,
  modalWidth: 500,
  renderOptions: () => {},
  children: [],
  closeOnBlanket: undefined,
};

Modal.propTypes = {
  title: PropTypes.string,
  modalWidth: PropTypes.number,
  children: PropTypes.array.isRequired,
  renderOptions: PropTypes.func.isRequired,
};

export default Modal;
