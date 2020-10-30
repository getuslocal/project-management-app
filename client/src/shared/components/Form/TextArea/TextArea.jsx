import React from 'react';
import {
  FormContainer,
  Label,
  FormContent,
  TextArea,
  Description,
  Warning
} from '../Form.style';

const FormTextArea = ({ label, description, onChange, maxLength, ...props }) => {
  return (
    <FormContainer>
      <FormContent>
        <Label >{label}</Label>
        <TextArea {...props} onChange={onChange} />
        <Description>{description}</Description>
        {maxLength && <Warning><span>&#42;</span> Value must be less than or equal to {maxLength}.</Warning>}
      </FormContent>
    </FormContainer>
  )
}

export default FormTextArea;
