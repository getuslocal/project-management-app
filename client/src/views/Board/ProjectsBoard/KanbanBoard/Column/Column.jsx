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
  Counter
} from './Column.style'

const InnerList = React.memo(props => {
  return (
    props.tickets.map((ticket, index) =>
      <Ticket key={ticket._id} ticket={ticket} index={index} />)
  )
})

const Column = ({ column, tickets, index }) => {
  const [isQuickTicketActive, setIsQuickTicketActive] = useState(false);
  const ticketsCounter = tickets.length;
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Title {...provided.dragHandleProps}>{column.title}<Counter>{ticketsCounter}</Counter></Title>
          <Content>
            <Droppable droppableId={column.id} type="task">
              {provided => (
                <TicketsList ref={provided.innerRef} {...provided.droppableProps}>
                  <InnerList tickets={tickets} />
                  {
                    isQuickTicketActive ?
                      <QuickTicket
                        setIsQuickTicketActive={setIsQuickTicketActive}
                        columnId={column.id}
                      />
                      :
                      <CreateTicketButton
                        isFirstColumn={(index === 0)}
                        onClick={() => setIsQuickTicketActive(true)}
                      >+ Create ticket</CreateTicketButton>
                  }
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