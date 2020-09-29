import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { color, fontSize, padding } from '../../utils/styles';

const mediumButtonStyle = css`
  font-size: 16px;
  padding: 9px 14px;
`

const largeButtonStyle = css`
  font-size: 18px;
  padding: 10px 16px;
`

export const StyledButton = styled.button`
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  border-radius: 3px;
  padding: 8px 12px;
  ${props => buttonVariants[props.variant]}
`

const colored = css`
  color: #fff;
  background: ${props => color[props.variant]};
  &:hover {
    opacity: 0.9;
  }
`;

const textButtonStyle = css`
  background: #fff;
  font-weight: 400;
  &:hover{
    opacity: .9;
    background-color: rgba(9,30,66,0.08);
  }
`

const buttonVariants = {
  primary: colored,
  success: colored,
  danger: colored,
  secondary: css`
    background: ${color.secondary};
  `,
  text: css`
    ${textButtonStyle}
  `,
};

// @todo : Organize the followings for LP.

const buttonStyles = css`
  display: inline-block;
  color: ${color.textLight};
  line-height: 1;
`;

export const LinkButtonContainer = styled.p`
display: inline-block;

&.active{
    a{
        border-color: ${color.primary};
        color: ${color.primary};
    }
}
`;

export const CustomLink = styled(Link)`
    display: inline-block;
    color: ${color.textLight};
    line-height: 1;
    padding: ${padding.double} ${padding.double};
    border: 0;
    text-align: center;
    cursor: pointer;
    font-weight: 400;
    width: 100%;
    height: 100%;
    border-bottom: 4px solid transparent;

    &:before{
        padding-right: .85em;
        font-size: ${fontSize.small2};
    }

    &:hover{
        color: ${color.primary};
    }

    ${getButtonStyles}
`
const getButtonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};
