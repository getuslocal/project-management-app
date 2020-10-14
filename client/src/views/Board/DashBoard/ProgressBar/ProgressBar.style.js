import styled, { css } from 'styled-components'
import { color } from '../../../../shared/utils/styles';

export const Container = styled.div`
  background-color: ${color.primary};
  height: 100%;
  border-radius: 7px;
`;

export const Title = styled.p`
  color: ${color.white};
  font-weight: 600;
  font-size: 16px;
`;

export const Top = styled.div`
  padding: 20px 20px 0;
  height: 42px;
`;

export const Content = styled.div`
  height: calc( 100% - 42px );
  padding: 20px;
  max-width: 280px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;
export const InnerText = styled.div`
  color: ${color.white};
`;
export const Percentage = styled.p`
  font-size: 46px;
  font-weight: 500;
  text-align: center;

  .percent-mark{
    font-size: 30px;
  }
`;

export const CompleteText = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

export const Bottom = styled.div`
  color: ${color.white};
  font-weight: 500;
  font-size: 12px;
  text-align: center;
`;
