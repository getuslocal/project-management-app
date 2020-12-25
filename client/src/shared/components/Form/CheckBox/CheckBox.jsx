import React, { Fragment, useState } from 'react';
import {
  FormCheckBoxContainer,
  FormCheckBoxInput,
  FormCheckBoxLabel,
} from './CheckBox.style';

const FormCheckBox = ({ name, ...props }) => {
  const [checked, setChecked] = useState(false);

  return (
    <FormCheckBoxContainer>
      <FormCheckBoxInput
        {...props}
        onChange={() => setChecked(!checked)}
        className={checked ? 'checked' : ''}
        id="formCheckBox"
      />
      <FormCheckBoxLabel htmlFor="formCheckBox">Remember me</FormCheckBoxLabel>
    </FormCheckBoxContainer>
  );
};

export default FormCheckBox;
