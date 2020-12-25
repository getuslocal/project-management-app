import styled, { css } from 'styled-components';
import { color } from '../../../shared/utils/styles';

export const UserIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;

  & > i {
    &::before {
      border: 2px solid ${color.borderLight};
    }
  }

  & > button {
    color: #5e6c84;

    &:hover {
      background-color: rgb(240 240 245);
    }
  }
`;
