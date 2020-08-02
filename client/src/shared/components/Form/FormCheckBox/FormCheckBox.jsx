import React, { Fragment, useState } from 'react';
import {
  FormCheckBoxContainer,
  FormCheckBoxInput,
  FormCheckBoxLabel,
} from './FormCheckBox.style';

const FormCheckBox = ({ name, ...props }) => {
  const [checked, setChecked] = useState(false);

  return (
    <FormCheckBoxContainer>
      <FormCheckBoxInput 
        {...props} 
        onChange={() => setChecked(!checked)}
        className={checked ? 'checked' : ''}
        id='formCheckBox'
      />
      <FormCheckBoxLabel for='formCheckBox'>Remember me</FormCheckBoxLabel>
    </FormCheckBoxContainer>
  )
};

export default FormCheckBox;