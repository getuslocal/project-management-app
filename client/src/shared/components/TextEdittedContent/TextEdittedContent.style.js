import styled from 'styled-components';
import { font } from '../../utils/styles';

export const Container = styled.div`
  padding: 5px;
  border-radius: 3px;
  min-height: 40px;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  padding: 0 !important;
  font-size: 14px;
  ${font.regular}
`;

export const Placeholder = styled.p`
  font-size: 14px;
  color: rgb(107, 119, 140);
`;
