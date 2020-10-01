import styled, { css } from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.div`
  display: flex;
  margin: 20px 0;
`

export const Content = styled.div`
  width: 100%;
`

export const Name = styled.p`
font-size: 14px;
color: rgb(66, 82, 110);
font-weight: 600;
margin-bottom: 6px;
`

export const Time = styled.span`
  margin-left: 16px;
  color: rgb(66, 82, 110);
  font-size: 12px;
  font-weight: 500;
`

export const TextArea = styled(TextareaAutosize)`
  border: none;
  appearance: none;
  font-size: 14px;
  width: 100%;
  resize: none;
  line-height: 1.28;
  padding: 4px 0;
`

export const Option = styled.p`
  color: rgb(94, 108, 132);
  font-size: 13px;
`

export const Delete = styled.span`
  cursor: pointer;
  padding: 2px 0px;
`
