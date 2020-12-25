import styled, { css } from 'styled-components';
import { color } from '../../utils/styles';

const smallButtonStyle = css`
  font-size: 12px;
  padding: 7px 6px;
`;

export const StyledButton = styled.button`
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  border-radius: 3px;
  padding: 10px 12px;
  ${(props) => buttonVariants[props.variant]};

  ${(props) =>
    props.inactive &&
    css`
      background-color: ${color.backgroundLightest};
      color: ${color.textVeryLight};
      &:hover {
        cursor: default;
      }
    `};
`;

const colored = css`
  color: #fff;
  background: ${(props) => color[props.variant]};
  &:hover {
    opacity: 0.9;
  }
`;

const textButtonStyle = css`
  background: #fff;
  font-weight: 400;
  &:hover {
    opacity: 0.9;
    background-color: rgba(9, 30, 66, 0.08);
  }
`;

const buttonVariants = {
  primary: colored,
  success: colored,
  danger: colored,
  secondary: css`
    background: ${color.secondary};
    &:hover {
      background: ${color.backgroundLight};
    }
  `,
  text: css`
    ${textButtonStyle}
  `,
  small: smallButtonStyle,
};
