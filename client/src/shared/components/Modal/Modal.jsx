import React from 'react'
import PropTypes from 'prop-types'
import {
  ModalContainer,
  Container,
  Blanket,
  Wrapper,
} from './Modal.style';

const Modal = ({ closeModal, renderContent }) => {
  return (
    <ModalContainer>
      <Blanket onClick={closeModal} />
      <Container>
        <Wrapper>
          {renderContent()}
        </Wrapper>
      </Container>
    </ModalContainer>
  )
}

Modal.propTypes = {

}

export default Modal
