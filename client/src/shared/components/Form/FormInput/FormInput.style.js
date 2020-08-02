import styled, { css } from 'styled-components';
import { color, fontSize, padding } from '../../../utils/styles';


const shrinkLabelStyles = css`
  top: -1.1em;
`;

export const FormInputContainer = styled.div`
  position: relative;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const Input = styled.input`
  color: ${color.textDarkest};
  font-size: ${fontSize.small2};
  padding: ${padding.small} ${padding.small} ${padding.small} 0.3125em;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 2px solid ${color.textVeryLight};
  transition: 300ms ease all;

  &:focus {
    outline: none;
    border-bottom-color:${color.primary};
  }

  &:focus ~ label {
    ${shrinkLabelStyles}
    color:  ${color.primary};
  }
`;

export const FormInputLabel = styled.label`
  color: ${color.textVeryLight};
  font-size: ${fontSize.small};
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0.3125em;
  top: ${padding.small};
  transition: 300ms ease all;

  &:before{
    padding-right:${padding.small};
    font-size:${fontSize.med};
  }

  &.shrink {
    ${shrinkLabelStyles}
  }
`;
