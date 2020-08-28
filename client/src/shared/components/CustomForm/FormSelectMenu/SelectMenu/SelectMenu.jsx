import React from 'react';
import {
  Container,
  MainContent,
  ListItem
} from './SelectMenu.style';

const SelectMenu = ({ handleSelectMenu, selectList, name }) => {
  return (
    <Container>
      <MainContent>
        <ul>
          {
            Object.keys(selectList).map((key) => selectList[key] ? (
              name === 'project' ? (
                <ListItem
                  key={key}
                  className={`icon-issue-${key.toLowerCase()}`}
                  onClick={() => handleSelectMenu(name, { id: selectList[key]._id, name: selectList[key].name })}
                >{selectList[key].name}</ListItem>
              ) : (
                  <ListItem
                    key={key}
                    className={`icon-issue-${key.toLowerCase()}`}
                    onClick={() => handleSelectMenu(name, selectList[key])}
                  >{selectList[key]}</ListItem>
                )
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