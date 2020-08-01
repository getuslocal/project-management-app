import React from 'react';
import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './FormInput.style';
import { PermIdentityIcon } from '@material-ui/icons';

const FormInput = ({ handleChange, label, iconType,  ...props }) => (
  <GroupContainer>
    <FormInputContainer className={`icon-${iconType}`} {...props} />
    {label ? (
      <FormInputLabel className={`icon-${iconType}`}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;