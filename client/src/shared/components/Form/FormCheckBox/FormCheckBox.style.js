import styled, { css } from 'styled-components';
import { color, fontSize, padding } from '../../../utils/styles';
import checkIcon from './assets/check.svg'

export const FormCheckBoxContainer = styled.div`
  text-align: left;
`;

export const FormCheckBoxInput = styled.input`
            width: 1rem;
            height: 1rem;
    margin: 0;
    padding: 0;
    opacity: 0;
    -webkit-appearance: none;
    appearance: none;
    position: absolute;
    border: none;

    +label {
        display: inline-flex;
        font-size: ${fontSize.small};
        color: ${color.textLight};
        padding-bottom: 0;

        &::before {
            display: inline-block;
            content: '';
            width: 1rem;
            height: 1rem;
            margin-right: .5rem;
            border: 1px solid ${color.textVeryLight2};
            border-radius:3px;
            flex-shrink: 0;
            position: relative;
            top: -0.125em;
        }

    }

            &.checked+label::before {
            background-image: url(${checkIcon});
            background-repeat: no-repeat;
            background-position: 0 .2em;
        }
`;

export const FormCheckBoxLabel = styled.label`

`