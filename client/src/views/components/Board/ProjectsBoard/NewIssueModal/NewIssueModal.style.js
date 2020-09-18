import styled, { css } from 'styled-components'

export const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  overflow: hidden auto;
`

export const Container = styled.div`
  background-color: rgba(23, 43, 77, .5);
  min-height: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 50px;
`

export const Content = styled.div`
  vertical-align: middle;
  display: inline-block;
  background-color: #fff;
  position: relative;
  z-index: 200;
  width: 100%;
  max-width: 800px;
  border-radius: 3px;
`

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

export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
`

export const Diviser = styled.div`
border-bottom: 1px solid #ddd;
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