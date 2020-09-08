import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Ticket from './Ticket/Ticket';
import QuickTicket from './QuickTicket/QuickTicket';
import {
  Container,
  Content,
  Title,
  TicketsList,
  CreateTicketButton,
  ButtonContainer
} from './Column.style'

const InnerList = React.memo(props => {
  return (
    props.tickets.map((ticket, index) =>
      <Ticket key={ticket._id} ticket={ticket} index={index} columnId={props.columnId} projectId={props.projectId} />)
  )
})

const Column = ({ column, tickets, index, projectId }) => {
  const [isQuickTicketActive, setIsQuickTicketActive] = useState(false);
  
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Content isDragging={snapshot.isDragging}>
            <Title {...provided.dragHandleProps}>{column.title}</Title>
            <Droppable droppableId={column.id} type="task">
              {provided => (
                <TicketsList ref={provided.innerRef} {...provided.droppableProps}>
                  <InnerList tickets={tickets} columnId={column.id} projectId={projectId} />
                  <ButtonContainer>
                    {
                      isQuickTicketActive ?
                        <QuickTicket 
                          setIsQuickTicketActive={setIsQuickTicketActive} 
                          projectId={projectId}
                          columnId={column.id}
                          />
                        :
                        <CreateTicketButton
                          isFirstColumn={(index === 0)}
                          onClick={() => setIsQuickTicketActive(true)}
                        >+ Create ticket</CreateTicketButton>
                    }
                  </ButtonContainer>
                  {provided.placeholder}
                </TicketsList>
              )}
            </Droppable>
          </Content>
        </Container>
      )}
    </Draggable>
  )
}

export default Column;