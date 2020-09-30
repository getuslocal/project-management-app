import React, { useState } from 'react';
import {
  Container,
  Button,
  StyledText
} from './Status.style';
import store from '../../../../../../../redux/store'
import { updateTicketStatus } from '../../../../../../../redux/projects/projects.actions';
import SelectMenu from '../../../../../../../shared/components/SelectMenu/SelectMenu';

const IssueStatusMenu = ({
  value,
  columns,
  columnOrder,
  projectId,
  ticketId,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleStatusChange = (column) => {
    const columnMove = {
      beforeColumn: value,
      afterColumn: column.id
    }
    store.dispatch(updateTicketStatus(columnMove, ticketId, projectId))
  };
  return (
    <Container>
      <Button
        isFirstColumn={(value === columnOrder[0])}
        isLastColumn={(value === columnOrder[columnOrder.length - 1])}
        type="button"
        className="icon-angle-down"
        onClick={() => setIsMenuOpen(true)}
      >
        {columns[value].title}
      </Button>
      <SelectMenu
        name="issuePriority"
        value={value}
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => handleStatusChange(option)}
        options={Object.values(columns).filter(column => column.id !== value).map(column => ({
          value: column.title,
          id: column.id
        }))}
        renderValue={({ value, id }) => {
          const isFirstColumn = (id === columnOrder[0]);
          const isLastColumn = (id === columnOrder[columnOrder.length - 1]);
          return (
            <StyledText isFirstColumn={isFirstColumn} isLastColumn={isLastColumn} >
              {value}
            </StyledText>
          )
        }}
      />
    </Container>
  )
}

export default IssueStatusMenu;
