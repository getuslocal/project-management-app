import styled from 'styled-components'
import { color } from '../../../../../../shared/utils/styles'

export const Container = styled.div`
margin: 16px 0;
p {
  color: rgb(107, 119, 140);
  white-space: nowrap;
  font-weight: 500;
  font-size: 12px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &.completed-text {
    & > i {
      color:${color.success};
      margin-right: 3px;
    }
  }
}
`