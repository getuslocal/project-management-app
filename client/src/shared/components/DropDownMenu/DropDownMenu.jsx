import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SelectMenu from '../SelectMenu/SelectMenu';
import Icon from '../Icon/Icon';
import {
  Container,
  Title,
  Content,
  CurrentItem,
  AngleDownIcon,
} from './DropDownMenu.style';

function DropDownMemu({ title, currentItem, onChange, options, renderValue }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Container>
      <Title>{title}</Title>
      <Content onClick={() => setIsMenuOpen(true)}>
        <CurrentItem>
          {currentItem}
        </CurrentItem>
        <AngleDownIcon>
          <Icon type="angle-down" isSolid={true} size={14} />
        </AngleDownIcon>
      </Content>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => onChange(option)}
        options={options}
        renderValue={renderValue}
      />
    </Container>
  )
}

export default DropDownMemu;

