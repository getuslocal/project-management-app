import React, { Fragment, useRef, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types'
import Ticket from './Ticket/Ticket';
import QuickTicket from './QuickTicket/QuickTicket';
import {
  Container,
  Content,
  Top,
  TopContent,
  TitleInput,
  TitleText,
  TicketsList,
  CreateTicketButton,
  Counter,
  Options,
  Option,
} from './Column.style'
import useOutsideClick from '../../../../../shared/hooks/useOutsideClick';
import Icon from '../../../../../shared/components/Icon/Icon';
import { updateProject } from '../../../../../redux/projects/projects.actions';
import store from '../../../../../redux/store';
import ColumnDeleteModal from './ColumnDeleteModal/ColumnDeleteModal';
import { setAlert } from '../../../../../redux/alert/alert.actions';

const InnerList = React.memo(props => {
  return (
    props.tickets.map((ticket, index) =>
      <Ticket key={ticket._id} ticket={ticket} index={index} projectKey={props.projectKey}/>)
  )
});

const Column = ({
  column,
  project: { _id: projectId, columns, columnOrder, key: projectKey},
  tickets,
  index,
}) => {
  const [isQuickTicketActive, setIsQuickTicketActive] = useState(false);
  const [editTitleActive, setEditTitleActive] = useState(false);
  const [warningModalActive, setWarningModalActive] = useState(false);
  const [title, setTitle] = useState(column.title);
  const titleInputRef = useRef();
  const ticketsCounter = tickets.length;

  useOutsideClick(titleInputRef, () => {
    if (!editTitleActive) return;
    setEditTitleActive(false);
  });

  const updateTitle = (targetColumnId) => {
    const trimmedTitle = title.trim();
    // Check the new title is the same or the title has no charactors.
    if (trimmedTitle === column.title || trimmedTitle.length === 0) return;
    // Update title of the column on db.
    const formValue = {
      columns: {
        ...columns,
        [targetColumnId]: {
          ...columns[targetColumnId],
          title: trimmedTitle
        }
      }
    }
    store.dispatch(updateProject(projectId, formValue));
  }

  return (
    <Fragment>
      <Draggable draggableId={column.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Top {...provided.dragHandleProps}>
              <TopContent>
                {
                  !editTitleActive ? (
                    <Fragment>
                      <TitleText onClick={() => setEditTitleActive(true)}>{column.title}</TitleText>
                      {
                        column.isDoneColumn ? (
                          <Icon className="check-icon" type="check" size={11} isSolid={true} />
                        ) : (
                            <Counter>{ticketsCounter}</Counter>
                          )
                      }
                      <Icon
                        onClick={() => {
                          if (Object.keys(columns).length <= 2) {
                            store.dispatch(setAlert('A project must have at least 2 columns.', 'error'));
                          } else {
                            setWarningModalActive(true)
                          }
                        }}
                        className="delete-column-btn"
                        type="trash"
                        size={15}
                      />
                    </Fragment>
                  ) : (
                      <Fragment>
                        <TitleInput
                          type="text"
                          maxLength="30"
                          ref={titleInputRef}
                          autoFocus
                          placeholder="Column name"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                        />
                        <Options>
                          <Option onClick={() => updateTitle(column.id)}><Icon type="check" size={12} isSolid={true} /></Option>
                          <Option onClick={() => setTitle(column.title)}><Icon type="close" size={12} isSolid={true} /></Option>
                        </Options>
                      </Fragment>
                    )
                }
              </TopContent>
            </Top>
            <Content>
              <Droppable droppableId={column.id} type="task">
                {provided => (
                  <TicketsList ref={provided.innerRef} {...provided.droppableProps}>
                    <InnerList tickets={tickets} projectKey={projectKey} />
                    {
                      !column.isDoneColumn && (
                        isQuickTicketActive ?
                          <QuickTicket
                            setIsQuickTicketActive={setIsQuickTicketActive}
                            columnId={column.id}
                          />
                          :
                          <CreateTicketButton
                            isFirstColumn={(index === 0)}
                            onClick={() => setIsQuickTicketActive(true)}
                          >+ Create issue</CreateTicketButton>
                      )
                    }
                    {provided.placeholder}
                  </TicketsList>
                )}
              </Droppable>
            </Content>
          </Container>
        )}
      </Draggable>
      {warningModalActive && (
        <ColumnDeleteModal
          projectId={projectId}
          targetColumnId={column.id}
          columns={columns}
          columnOrder={columnOrder}
          closeModal={() => setWarningModalActive(false)}
          tickets={tickets}
        />
      )}
    </Fragment>
  )
};

Column.propTypes = {
  project: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  tickets: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
}

export default Column;