import React from 'react';
import {
  FormContainer,
  Label,
  FormContent,
  TextArea,
  Description,
} from '../CustomForm.style';

const FormTextArea = ({ label, description, handleChange, ...props }) => {
  return (
    <FormContainer>
      <FormContent>
        <Label>{label}</Label>
        <TextArea {...props} onChange={handleChange} />
        <Description>{description}</Description>
      </FormContent>
    </FormContainer>
  )
}

export default FormTextArea;
