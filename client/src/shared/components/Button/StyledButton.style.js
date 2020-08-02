import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { color, fontSize, padding } from '../../utils/styles';

const buttonStyles = css`
  display: inline-block;
  color: ${color.textLight};
  line-height: 1;

  &:hover {
  }
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
