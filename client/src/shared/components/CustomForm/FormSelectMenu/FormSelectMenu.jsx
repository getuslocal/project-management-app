import React from 'react';
import SelectMenu from './SelectMenu/SelectMenu';
import {
  FormContainer,
  Label,
  FormContentWithIcon,
  Input,
  Description,
} from '../CustomForm.style';

const FormSelectMenu = ({ label, handleModalOpen, selectList, handleSelectMenu, isModalOpen, description, width, renderValue, returnValue, ...props }) => {
  const { name, value } = props;
  return (
    <FormContainer>
      <Label>{label}</Label>
      <FormContentWithIcon width={width} className={`icon-angle-down icon-issue-${value.toLowerCase()}`}>
        <Input
          type="text"
          autoComplete="off"
          readOnly
          onClick={() => handleModalOpen(name)}
          {...props}
        />
        {
          isModalOpen === name ?
            <SelectMenu handleSelectMenu={handleSelectMenu} selectList={selectList} name={name} renderValue={renderValue} returnValue={returnValue} />
            :
            <></>
        }
      </FormContentWithIcon>
      <Description>{description}</Description>
    </FormContainer>
  )
}


export default FormSelectMenu;
