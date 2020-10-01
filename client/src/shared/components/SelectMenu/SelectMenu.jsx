import React, { useRef } from 'react';
import {
  Container,
  Lists,
  List
} from './SelectMenu.style';
import useOutsideClick from "../../hooks/useOutsideClick";

const SelectMenu = ({
  options,
  width,
  isActive,
  onChange,
  renderValue,
  setIsMenuOpen
}) => {
  const menuRef = useRef();

  useOutsideClick(menuRef, () => {
    if (!isActive) return
    setIsMenuOpen(false)
  });

  return (
    <Container width={width} isActive={isActive} ref={menuRef}>
      <Lists>
        {
          options.map(option => {
            return (
              <List key={option.value} onClick={() => {
                onChange(option)
                setIsMenuOpen(false)
              }}>
                {
                  renderValue ?
                    renderValue({ value: option.value, ...option })
                    :
                    option.value
                }
              </List>
            )
          })
        }
      </Lists>
    </Container>
  )
}

export default SelectMenu;