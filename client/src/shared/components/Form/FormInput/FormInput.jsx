import React from 'react';
import {
  FormInputContainer,
  Input,
  FormInputLabel
} from './FormInput.style';

const FormInput = ({ handleChange, label, iconType,  ...props }) => (
  <FormInputContainer>
    <Input className={props.value.length ?`highlight` : ''} {...props} onChange={handleChange}/>
    {label ? (
      <FormInputLabel className={props.value.length ?`shrink icon-${iconType}` : `icon-${iconType}`}>
        {label}
      </FormInputLabel>
    ) : null}
  </FormInputContainer>
);

export default FormInput;