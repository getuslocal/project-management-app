import styled, { css } from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.div`
  margin: 20px 0;
`

export const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 1.25em;
`

export const Top = styled.div`
  display: flex;
`

export const Bottom = styled.div`
`

export const TextAreaWrapper = styled.div`
  width: 100%;
`

export const Textarea = styled(TextareaAutosize)`
  overflow: hidden;
  width: 100%;
  resize: none;
  line-height: 1.28;
  padding: 0.75rem .5rem;
  border-radius: 3px;
  font-size: 13px;
  border: 1px solid #dfe1e6;

  &:hover {
    background-color: #091e420d;
  }

  &:focus{
    outline: none;
    border: 2px solid rgb(76, 154, 255);
    background-color: #fff;
    &+button{
      /* display: block; */
    }
  }
`

export const ButtonsContainer = styled.div`
  margin-top: .35em;
`

// @todo: get this from share dir.
export const Button = styled.button`
        background-color: rgb(0, 82, 204);
        border-radius: 3px;
        color: #fff;
        padding: .6em;
        font-size: 14px;
        font-weight: 500;
        margin-right: 1em;
        border: none;
        /* display: none; */
        &:hover {
          opacity: .9;
          cursor: pointer;
        }
`
// @todo: get this from share dir.
export const CancelButton = styled.button`
    display: inline-block;
    padding: .6em;
    font-size: 14px;
    font-weight: 400;
    border-radius: 3px;
    &:hover {
          opacity: .9;
          background-color: rgba(9, 30, 66, 0.08);
          cursor: pointer;
        }
`

export const CommentWrapper = styled.div`
  display: flex;
  margin: 20px 0;
`

export const CommentContent = styled.div`
  width: 100%;
`

export const Name = styled.p`
font-size: 14px;
color: rgb(66, 82, 110);
font-weight: 600;
margin-bottom: .5em;
`
export const Time = styled.span`
  margin-left: 1em;
  color: rgb(66, 82, 110);
  font-size: 12px;
  font-weight: 500;
`

export const CommentTextarea = styled(TextareaAutosize)`
  border: none;
  appearance: none;
  font-size: 14px;
  width: 100%;
  resize: none;
  line-height: 1.28;
  padding: .3em 0;
`

export const Options = styled.p`
  color: rgb(94, 108, 132);
  font-size: 13px;
`
export const Edit = styled.span`
  cursor: pointer;
  padding: 2px 0px;
  margin-right: .5em;
`
export const Delete = styled.span`
  cursor: pointer;
  padding: 2px 0px;
`
