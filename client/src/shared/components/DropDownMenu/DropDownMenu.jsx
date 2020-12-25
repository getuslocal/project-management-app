import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectMenu from '../SelectMenu/SelectMenu';
import Icon from '../Icon/Icon';
import {
  Container,
  Title,
  Content,
  CurrentItem,
  AngleDownIcon,
  Description,
} from './DropDownMenu.style';

function DropDownMemu({
  title,
  currentItem,
  onChange,
  options,
  renderValue,
  description,
  ...props
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Container {...props}>
      <Title>{title}</Title>
      <Content
        className="drop-down-menu-content"
        onClick={() => setIsMenuOpen(true)}
      >
        <CurrentItem>{currentItem()}</CurrentItem>
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
      {description && <Description>{description}</Description>}
    </Container>
  );
}

export default DropDownMemu;
