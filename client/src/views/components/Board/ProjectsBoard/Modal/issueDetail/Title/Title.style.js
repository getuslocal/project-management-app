import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin: 20px 0;
  textarea {
  overflow: hidden;
  width: 100%;
  resize: none;
  line-height: 1.28;
  padding: 0.3125rem .5rem;
  border-radius: 3px;
  border: 2px solid transparent;
  font-size: 22px;

  &:hover {
    background-color: #091e420d;
  }

  &:focus{
    outline: none;
    border: 2px solid rgb(76, 154, 255);
    background-color: #fff;
  }
  }
`
