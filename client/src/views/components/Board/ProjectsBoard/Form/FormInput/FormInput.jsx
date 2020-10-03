import React from 'react';
import {
  FormContainer,
  Label,
  FormContent,
  Input,
  Description,
} from '../Form.style';

const FormInput = ({ label, description, onChange, ...props }) => {
  return (
    <FormContainer>
      <FormContent>
        <Label>{label}</Label>
        <Input {...props} onChange={onChange} />
        <Description>{description}</Description>
      </FormContent>
    </FormContainer>
  )
}

export default FormInput;
