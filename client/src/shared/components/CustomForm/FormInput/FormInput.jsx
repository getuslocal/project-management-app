import React from 'react';
import {
  FormContainer,
  Label,
  FormContent,
  Input,
  Description,
} from '../CustomForm.style';

const FormInput = ({ label, description, handleChange, theme,  ...props }) => {
  return (
    <FormContainer>
      <FormContent className={theme ? `theme-input-${theme}` : ''}>
        <Label>{label}</Label>
        <Input {...props} onChange={handleChange}/>
        <Description>{description}</Description>
      </FormContent>
    </FormContainer>
  )
}

export default FormInput;
