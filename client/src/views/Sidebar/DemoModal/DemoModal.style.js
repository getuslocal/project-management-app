import styled from 'styled-components';
import { color } from '../../../shared/utils/styles';

export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
`;

export const MenuOption = styled.div`
  font-size: 14px;

  & > span {
    color: ${color.textMedium};
    font-size: 12px;
  }
`;

export const MemberOption = styled.div`
  display: flex;
  align-items: center;

  & > i {
    margin-right: 7px;
  }

  & > span {
    color: ${color.textMedium};
    font-size: 12px;
    margin-left: 5px;
  }
`;

export const Action = styled.div`
  text-align: right;
`;
