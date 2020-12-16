import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './WithSpinner.styles';

const Spinner = ({ loadingText, filled }) => (
  <SpinnerOverlay filled={filled} >
    {loadingText && <p>{loadingText}</p>}
    <SpinnerContainer />
  </SpinnerOverlay>
)

export default Spinner;
