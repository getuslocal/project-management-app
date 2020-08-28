import React from 'react';
import {
  FormContainer,
  Label,
  FormContent,
  Input,
  Description,
} from '../CustomForm.style';

const FormInput = ({ label, description, handleChange, ...props }) => {
  return (
    <FormContainer>
      <FormContent>
        <Label>{label}</Label>
        <Input {...props} onChange={handleChange}/>
        <Description>{description}</Description>
      </FormContent>
    </FormContainer>
  )
}

export default FormInput;
