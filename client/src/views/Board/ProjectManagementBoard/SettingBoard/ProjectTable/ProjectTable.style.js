import styled, { css } from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const NameCell = styled.td`
  & > i {
    vertical-align: middle;
    margin-right: 10px;

    &:before {
      border-radius: 3px;
    }
  }

  & > span {
    color: ${color.blue};

    &:hover{
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
