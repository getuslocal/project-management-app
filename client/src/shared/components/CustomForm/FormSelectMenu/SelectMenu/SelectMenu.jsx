import React from 'react';
import {
  Container,
  MainContent,
  ListItem
} from './SelectMenu.style';

const SelectMenu = ({ handleSelectMenu, selectList, name, renderValue, returnValue }) => {
  // console.log(selectList['5f40b26cf44b491638e3709c']['name'])
  return (
    <Container>
      <MainContent>
        <ul>
          {
            Object.keys(selectList).map((key) => selectList[key] ? (
              <ListItem
                key={key}
                className={`icon-issue-${key.toLowerCase()}`}
                onClick={() => handleSelectMenu(name, returnValue ? selectList[key][returnValue] : selectList[key])}
              >
                {
                  renderValue ?
                    selectList[key][renderValue]
                    :
                    selectList[key]
                }
              </ListItem>
            )
              :
              '')
          }
        </ul>
      </MainContent>
    </Container>
  )
}

export default SelectMenu;