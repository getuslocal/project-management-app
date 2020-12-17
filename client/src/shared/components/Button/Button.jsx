import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './Button.style';

const propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'success', 'danger', 'secondary', 'text', 'small']),
};

const defaultProps = {
  text: undefined,
  variant: 'secondary',
  handleClick: () => {},
  inactive: false,
};

const Button = ({
  text,
  handleClick,
  variant,
  children,
  inactive,
  ...otherProps
}) => {
  return (
    <StyledButton
      onClick={handleClick}
      variant={variant}
      inactive={inactive}
      {...otherProps}
    >
      {text && text}
      {children && children}
    </StyledButton>
  );
}


Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;