import styled, { css } from 'styled-components';
import { color, fontSize, padding } from '../../../utils/styles';

export const FormGroupContainer = styled.div`
`;

export const FromButtonInput = styled.input`
    display: inline-block;
    background: ${color.primary};
    line-height: 1;
    padding: ${padding.med} ${padding.double};
    border: 0;
    text-align: center;
    cursor: pointer;
    font-weight: 400;
    color: ${color.white};
    border-radius: 5px;
    width: 100%;
    box-shadow: 0 5px blue;
    top: 0;

    &:active {
        position: relative;
        outline: none;
        top: 5px;
        box-shadow: none;
    }

`;
