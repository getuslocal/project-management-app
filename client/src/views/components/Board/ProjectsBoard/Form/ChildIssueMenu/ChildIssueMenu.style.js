import styled, { css } from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize';

export const InnerContainer = styled.div`
border : none;
border: 1px solid #dfe1e6;
border-radius: 3px;
background-color: rgb(250, 251, 252);
width: 100%;
position: relative;

`

export const ListContainer = styled.ul`
  padding: 4px 30px 4px 8px;
  width: 100%;
  min-height: 30px;
  font-size: 14px;
  font-weight: 400;
  color: #172b4d;
  border: none;
  background-color: rgb(250, 251, 252);

  &:hover {
    background-color: #091e420d;
    cursor: pointer;
  }
`
export const List = styled.li`
padding: 3px 0;
&:not(:last-child){
  margin-bottom: 4px;
}
`

export const Button = styled.span`
  font-size: 10px;
  margin-left: 5px;
  vertical-align: middle;
  display: inline-block;
`