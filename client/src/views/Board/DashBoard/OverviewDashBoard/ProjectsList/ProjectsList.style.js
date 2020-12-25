import styled, { css } from 'styled-components';
import { color } from '../../../../../shared/utils/styles';

export const Container = styled.div`
  min-height: 220px;
  width: 100%;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const SectionTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
`;

export const NoProjectsText = styled.p`
  font-size: 16px;
  color: ${color.textMedium};
  padding: 20px 0;
`;
