import styled from 'styled-components'
import { color } from '../../../../../../shared/utils/styles'

export const Container = styled.div`
margin: 20px 0;
`

export const Label = styled.p`
  display: block;
  color: #5e6c84;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 2px;
`

export const Discription = styled.p`
  font-weight: 400;
  line-height: 20px;
  font-size: 11px;
  color: #6c798f;

  & > span {
    color: ${color.danger};
  }
`
