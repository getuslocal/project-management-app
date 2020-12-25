import styled from 'styled-components';
import { color } from '../../../../../shared/utils/styles';

export const Top = styled.div`
  display: flex;
  padding-bottom: 7px;
  border-bottom: 2px solid ${color.borderLightest};
`;

export const DayName = styled.div`
  width: calc(100% / 7);
  max-width: calc(100% / 7);
  padding: 0 5px;
  text-align: right;
  color: #99a1a7;
  font-weight: 500;
  font-size: 14px;
`;

export const Bottom = styled.div`
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
`;

export const Week = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
