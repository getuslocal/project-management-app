import styled, { css } from 'styled-components'
import { color } from '../../../../../shared/utils/styles';

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

export const FlexLeft = styled.div`
  margin-right: 10px;
`

export const FlexRight = styled.div`
  font-size: 14px;
`

export const Email = styled.p`
  font-size: 12px;
  color: ${color.textLight};
`