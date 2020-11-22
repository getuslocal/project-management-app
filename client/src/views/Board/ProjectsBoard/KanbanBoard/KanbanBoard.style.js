import styled from 'styled-components'
import { color } from '../../../../shared/utils/styles'

export const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

export const NewColumnButton = styled.button`
  background-color: ${color.lightGray};
  min-height: 42px;
  height: 42px;
  min-width: 42px;
  width: 42px;
  border-radius: 6px;

  &:hover {
    background-color: ${color.backgroundLight};
  }

  & > i {
    color: ${color.textDark};
  }
`