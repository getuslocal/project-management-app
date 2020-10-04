import styled from 'styled-components'

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

export const ButtonsContainer = styled.div`
  margin-top: 8px;
  & > button {
    margin-right: 6px;
  }
`
export const TextEdittedWrapper = styled.div`
  border: 2px solid #dfe1e6;
  border-radius: 3px;
  background-color: rgb(250, 251, 252);

  &:hover {
    background-color: #091e420d;
  }
`
