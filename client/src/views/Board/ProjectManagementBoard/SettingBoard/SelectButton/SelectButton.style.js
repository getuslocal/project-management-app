import styled, { css } from 'styled-components';
import { color } from '../../../../../shared/utils/styles';

export const Button = styled.button`
  border: 1px solid ${color.orange};
  color: ${color.orange};
  border-radius: 3px;
  font-size: 14px;
  padding: 7px 14px;
  display: flex;
  & > i {
    margin-left: 4px;
  }

  &:hover {
    background-color: rgba(255, 122, 89, 0.05);
  }
`;
export const SelectItem = styled.div`
  font-size: 13.5px;
  padding: 5px;

  &.delete {
    color: ${color.danger};
    & > i {
      margin-right: 5px;
    }
  }
`;
