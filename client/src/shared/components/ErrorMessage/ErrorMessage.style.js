import styled from 'styled-components';
import { color, fontSize } from '../../../shared/utils/styles';

export const ErrorMessageContainer = styled.p`
  color: ${color.danger};
  text-align: left;
  font-size: ${fontSize.small2};
  padding: 0.75em 0.75em 0.75em 2.25em;
  position: relative;
  color: #f44336;
  background-color: #fdd;
  border-radius: 3px;

  &::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    font-size: ${fontSize.small2};
    content: '\f071';
    position: absolute;
    left: 0.75em;
  }
`;
