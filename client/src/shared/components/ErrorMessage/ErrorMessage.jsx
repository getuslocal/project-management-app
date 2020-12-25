import React from 'react';
import { ErrorMessageContainer } from './ErrorMessage.style';

const ErrorMessage = ({ errorMessage }) => (
  <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
);

export default ErrorMessage;
