import styled, { css } from 'styled-components'

export const FormContainer = styled.div`
  margin: 20px 0;
  position: relative;
`

export const Label = styled.label`
  display: block;
  color: #5e6c84;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 2px;
`

export const FormContent = styled.div`
  width: 100%;
`

const CommonFormStyle = css`
  font-size: 14px;
  font-weight: 400;
  color: #172b4d;
  font-style: normal;
  line-height: 20px;
  padding: 5px 8px;
  border : none;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  background-color: rgb(250, 251, 252);
  transition: all .2s;
  
  &:hover {
    background-color: #091e420d;
  }

  &:focus{
    background-color: #fff;
    outline: none;
    border-color: rgb(76, 154, 255);
    box-shadow: rgb(76,154,255) 0px 0px 0px 1px;
    background-color: #fff;
  }
`

export const Input = styled.input`
  ${CommonFormStyle}
  width: ${props => (props.width ? `${props.width}px` : '100%')};
`

export const TextArea = styled.textarea`
  ${CommonFormStyle}
  width: ${props => (props.width ? `${props.width}px`: '100%')};
`

export const Description = styled.p`
  font-weight: 400;
  line-height: 20px;
  font-size: 11px;
  color: #6c798f;
`