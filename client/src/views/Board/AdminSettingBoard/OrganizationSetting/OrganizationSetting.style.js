import styled, { css } from 'styled-components';
import { color } from '../../../../shared/utils/styles';

export const Container = styled.div`
  padding: 0 5px;

  .not-implemented-action {
    position: relative;
    &:hover {
      cursor: not-allowed;
      &::before {
        content: 'NOT AVAILABLE IN DEMO';
        font-size: 12px;
        border-radius: 3px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${color.backgroundMedium};
        color: ${color.textDark};
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 22px;
`;
