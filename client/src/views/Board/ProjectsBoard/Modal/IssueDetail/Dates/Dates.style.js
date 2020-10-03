import styled from 'styled-components'

export const Container = styled.div`
margin: 16px 0;
p {
  color: rgb(107, 119, 140);
  white-space: nowrap;
  font-size: 12px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
}
`