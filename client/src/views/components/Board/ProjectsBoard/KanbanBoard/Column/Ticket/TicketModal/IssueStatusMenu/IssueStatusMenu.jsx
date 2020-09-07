import React from 'react';
import {
  Container,
  Button,
  DropDownMenu,
  ListItem,
  Span
} from './IssueStatusMenu.style';

const FormSelectMenu = ({
  name,
  value,
  currentOrder,
  columnsList,
  columnOrder,
  handleModalOpen,
  isModalOpen,
  handleSelectMenu,
}) => (
    <Container>
      <Button
        isFirstColumn={(currentOrder === columnOrder[0])}
        isLastColumn={(currentOrder === columnOrder[columnOrder.length - 1])}
        type="button"
        className="icon-angle-down"
        onClick={() => handleModalOpen(name)}
      >
        {value}
      </Button>
      {
        isModalOpen === name ?
          <DropDownMenu>
            <ul>
              {
                Object.keys(columnsList).map((key) => {
                  if (!columnsList[key]) return '';
                  const isFirstColumn = (columnsList[key]['id'] === columnOrder[0]);
                  const isLastColumn = (columnsList[key]['id'] === columnOrder[columnOrder.length - 1]);
                  return (
                    <ListItem key={key} onClick={() => handleSelectMenu(name, columnsList[key]['id'])}>
                      <Span isFirstColumn={isFirstColumn} isLastColumn={isLastColumn} >
                        {columnsList[key]['title']}
                      </Span>
                    </ListItem>
                  )
                })
              }
            </ul>
          </DropDownMenu>
          :
          <></>
      }
    </Container>
  );

export default FormSelectMenu;
