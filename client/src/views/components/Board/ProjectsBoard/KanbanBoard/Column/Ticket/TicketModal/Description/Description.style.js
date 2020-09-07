import styled, {css} from 'styled-components'

export const Container = styled.div`
  margin: 20px 0;

  textarea {
  width: 100%;
  line-height: 1.28;
  padding: 0.3125rem .5rem;
  resize: none;
  border-radius: 3px;
  font-size: 15px;
  border: 1px solid transparent;
  overflow-y: hidden;
  
  &:hover {
    background-color: #091e420d;
  }
  &:focus{
    border: 1px solid rgb(223, 225, 230);
    background-color: #fff;
  }
  }
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`

