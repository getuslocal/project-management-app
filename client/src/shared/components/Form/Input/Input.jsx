import React from 'react';
import {
  FormContainer,
  Label,
  FormContent,
  Input,
  Description,
  Warning
} from '../Form.style';

const FormInput = ({ label, description, onChange, maxLength, ...props }) => {
  return (
    <FormContainer>
      <FormContent>
        <Label>{label}</Label>
        <Input {...props} maxLength={maxLength} onChange={onChange} />
        <Description>{description}</Description>
        {maxLength && <Warning className="warning-message"><span>&#42;</span> Value must be less than or equal to {maxLength}.</Warning>}
      </FormContent>
    </FormContainer>
  )
}

export default FormInput;
