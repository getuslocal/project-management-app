import styled, { css } from 'styled-components'

export const Title = styled.p`
  padding: 20px 30px;
  font-size: 19px;
  line-height: 1.5;
  font-weight: 500;
`
export const InnerWrapper = styled.div`
  padding: 0 30px;
  height: 700px;
  overflow-y: scroll;
`

export const ButtonsContainer = styled.div`
  text-align: right;
  padding: 10px 30px;

  ${({ isEpicModal }) => isEpicModal && css`
  input {
    background-color: purple !important
  }
  p{
    color: purple !important
  }
`}
`
export const SubmitButton = styled.input`
  font-weight: 600;
  background-color: rgb(0, 82, 204);
  border-radius: 3px;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 15px;
  border: none;

  &:hover {
    opacity: .9;
    cursor: pointer;
  }
`
export const TextButton = styled.p`
  display: inline-block;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 3px;
  color: rgb(0, 82, 204);

  &:hover {
    opacity: .9;
    background-color: rgba(9, 30, 66, 0.08);
    cursor: pointer;
  }
`