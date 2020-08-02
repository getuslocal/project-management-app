import React, { Fragment } from 'react';
import {
  FormCheckBoxContainer,
  FormCheckBoxInput,
  FormCheckBoxLabel,
} from './FormCheckBox.style';

const FormCheckBox = ({ name, ...props }) => (
  <FormCheckBoxContainer>
    <FormCheckBoxInput {...props} />
    <FormCheckBoxLabel>Remember me</FormCheckBoxLabel>
  </FormCheckBoxContainer>
);

export default FormCheckBox;