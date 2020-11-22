import React from 'react'
import PropTypes from 'prop-types'
import {
  ModalContainer,
  Container,
  Blanket,
  Wrapper,
} from './Modal.style';

const Modal = ({ closeModal, children }) => {
  return (
    <ModalContainer>
      <Blanket onClick={closeModal} />
      <Container>
        <Wrapper>
          {children}
        </Wrapper>
      </Container>
    </ModalContainer>
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func,
}

export default Modal
