import styled, { css } from 'styled-components';
import { color, zIndexValues } from '../../shared/utils/styles';

export const Container = styled.div`
  padding: 16px 12px;
  margin: 16px;
  background: ${color.backgroundLight};
  color: ${color.textDark};
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${zIndexValues.alert};
  min-width: 300px;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15) !important;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  line-height: 1;

  &.alert-error {
    color: #fff;
    background: ${color.danger};
    & > i {
      margin-right: 8px;
    }
  }

  &.alert-success {
    background: ${color.success};
    color: #fff;
    & > i {
      margin-right: 8px;
    }
  }
`;
