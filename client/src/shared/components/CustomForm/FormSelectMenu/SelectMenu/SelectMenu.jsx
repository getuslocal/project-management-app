import React from 'react';
import {
  Container,
  MainContent,
  ListItem
} from './SelectMenu.style';
import Icon from '../../../../../shared/components/Icon/Icon';

const SelectMenu = ({ handleSelectMenu, selectList, name, renderValue, returnValue, iconStyle }) => {
  return (
    <Container>
      <MainContent>
        <ul>
          {
            Object.keys(selectList).map((key) => {
              if (!selectList[key]) return '';
              const iconValue = (iconStyle && iconStyle.renderValue) ? (selectList[key][iconStyle.renderValue]) : (selectList[key]);
              return (
                <ListItem
                  key={key}
                  onClick={() => handleSelectMenu(name, returnValue ? selectList[key][returnValue] : selectList[key])}
                >
                  <Icon iconStyle={{ ...iconStyle, type: iconValue }} />
                  {
                    renderValue ?
                      selectList[key][renderValue]
                      :
                      selectList[key]
                  }
                </ListItem>
              )
            })
          }
        </ul>
      </MainContent>
    </Container>
  )
}

export default SelectMenu;