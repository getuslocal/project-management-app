import React from 'react';
import SelectMenu from './SelectMenu/SelectMenu';
import {
  FormContainer,
  Label,
  FormContentWithIcon,
  Input,
  Description,
} from '../CustomForm.style';

const FormSelectMenu = ({
  label,
  handleModalOpen,
  selectList,
  handleSelectMenu,
  isModalOpen,
  description,
  width,
  hasIcon,
  renderValue,
  returnValue,
  backgroundStyle,
  theme,
  ...props
}) => {
  const { name, value } = props;
  return (
    <FormContainer>
      <Label>{label}</Label>
      <FormContentWithIcon
        width={width}
        backgroundStyle={backgroundStyle}
        className={`${backgroundStyle !== "transparent" ? 'icon-angle-down' : ''} icon-issue-${value.toLowerCase()} ${theme ? `theme-${theme}` : ''}`}>
        <Input
          type="text"
          autoComplete="off"
          readOnly
          backgroundStyle={backgroundStyle}
          onClick={() => handleModalOpen(name)}
          hasIcon={hasIcon}
          {...props}
        />
        {
          isModalOpen === name ?
            <SelectMenu
              handleSelectMenu={handleSelectMenu}
              selectList={selectList}
              theme={theme}
              name={name}
              renderValue={renderValue}
              returnValue={returnValue}
            />
            :
            <></>
        }
      </FormContentWithIcon>
      <Description>{description}</Description>
    </FormContainer>
  )
}


export default FormSelectMenu;
