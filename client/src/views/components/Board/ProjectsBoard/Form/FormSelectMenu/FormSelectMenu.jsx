import React from 'react';
import SelectMenu from './SelectMenu/SelectMenu';
import Icon from '../../../../../../shared/components/Icon/Icon';
import {
  FormContainer,
  Label,
  Description,
} from '../Form.style';
import {
  FormWrapper,
  OuterWrapper,
  Input,
} from './FormSelectMenu.style';

const FormSelectMenu = ({
  label,
  handleModalOpen,
  selectList,
  handleSelectMenu,
  isModalOpen,
  description,
  width,
  renderValue,
  returnValue,
  isTransparentBackground,
  iconStyle,
  height,
  ...props
}) => {
  const { name, value } = props;
  return (
    <FormContainer>
      <Label>{label}</Label>
      <OuterWrapper width={width}>
        <FormWrapper
          height={height}
          isTransparentBackground={isTransparentBackground}
          onClick={() => handleModalOpen(name)}
        >
          <Icon iconStyle={iconStyle} />
          <Input
            type="text"
            autoComplete="off"
            readOnly
            {...props}
          />
        </FormWrapper>
        {
          isModalOpen === name ?
            <SelectMenu
              handleSelectMenu={handleSelectMenu}
              selectList={selectList}
              name={name}
              renderValue={renderValue}
              returnValue={returnValue}
              iconStyle={iconStyle}
            />
            :
            <></>
        }
      </OuterWrapper>
      <Description>{description}</Description>
    </FormContainer>
  )
}


export default FormSelectMenu;
