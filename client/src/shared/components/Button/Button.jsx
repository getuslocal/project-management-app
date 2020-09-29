import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './Button.style';

const propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'success', 'danger', 'secondary', 'text']),
};

const defaultProps = {
  text: undefined,
  variant: 'secondary',
  handleClick: () => {},
};

const Button = ({
  text,
  handleClick,
  variant,
  ...otherProps
}) => {
  return (
    <StyledButton
      onClick={handleClick}
      variant={variant}
      {...otherProps}
    >
      {text}
    </StyledButton>
  );
}


Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;