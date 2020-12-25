import React, { useRef } from 'react';
import { Container, Lists, List, EmptyMessage } from './SelectMenu.style';
import useOutsideClick from '../../hooks/useOutsideClick';

const SelectMenu = ({
  options,
  width,
  isActive,
  onChange,
  renderValue,
  setIsMenuOpen,
  ...props
}) => {
  const menuRef = useRef();

  useOutsideClick(menuRef, () => {
    if (!isActive) return;
    setIsMenuOpen(false);
  });

  return (
    <Container width={width} isActive={isActive} ref={menuRef} {...props}>
      <Lists>
        {options.map((option) => {
          return (
            <List
              key={option.key}
              onClick={() => {
                onChange(option);
                setIsMenuOpen(false);
              }}
            >
              {renderValue
                ? renderValue({ value: option.value, ...option })
                : option.value}
            </List>
          );
        })}
        {options.length === 0 && <EmptyMessage>No options found.</EmptyMessage>}
      </Lists>
    </Container>
  );
};

export default SelectMenu;
