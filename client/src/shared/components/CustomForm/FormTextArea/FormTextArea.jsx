import React from 'react';
import {
  FormContainer,
  Label,
  FormContent,
  TextArea,
  Description,
} from '../CustomForm.style';

const FormTextArea = ({ label, description, handleChange, theme, ...props }) => {
  return (
    <FormContainer>
      <FormContent className={theme ? `theme-textarea-${theme}` : ''}>
        <Label >{label}</Label>
        <TextArea {...props} onChange={handleChange} />
        <Description>{description}</Description>
      </FormContent>
    </FormContainer>
  )
}

export default FormTextArea;
