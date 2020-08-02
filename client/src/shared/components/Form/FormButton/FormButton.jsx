import React from 'react';
import {
  FromButtonInput,
} from "./FormButton.style";

const FromButton = ({ name,  ...props }) => (
    <FromButtonInput {...props} />
);

export default FromButton;