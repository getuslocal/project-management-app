import styled from 'styled-components';
import { color } from '../../../../shared/utils/styles';

export const Container = styled.div`
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InnerContainer = styled.div`
  width: 700px;
  text-align: center;
`;

export const Heading = styled.h2`
  margin-bottom: 20px;
`;

export const Description = styled.p`
  color: ${color.textMedium};
  margin-bottom: 14px;
`;

export const Image = styled.img`
  width: 570px;
  max-width: 570px;
  height: auto;
`;
