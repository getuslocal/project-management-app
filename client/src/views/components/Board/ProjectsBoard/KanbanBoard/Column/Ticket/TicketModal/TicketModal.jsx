import React from 'react';
import {
  ModalContainer,
  MainContent,
  Title,
  Blanket,
  ButtonsContainer,
  SubmitButton,
  TextButton,
} from './TicketModal.style';

const TicketModal = ({ ticketId, setIsModalOpen, DeleteTicket, ...props }) => {
  return (
    <ModalContainer >
      <Blanket onClick={() => setIsModalOpen(false)} />
      <MainContent>
        <i className="far fa-trash-alt" onClick={DeleteTicket}></i>
        <Title>Create issue</Title>
        <div>
        </div>
        {/* <ButtonsContainer>
        <SubmitButton value="Update" type="submit" />
        <TextButton onClick={() => setIsModalOpen(false)}>Cancel</TextButton>
      </ButtonsContainer> */}
      </MainContent>
    </ModalContainer>
  )
}

export default TicketModal;