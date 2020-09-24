import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin: 20px 0;
  position: relative;
`
export const Button = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-style: normal;
  line-height: 20px;
  padding: .4em .75em;
  border : none;
  border-radius: 3px;
  background: rgb(0, 82, 204);
  &:after{
    margin-left: 20px;
  }
  &:hover {
    cursor: pointer;
  }
  ${({ isLastColumn }) => isLastColumn && css`
    background-color: rgb(227, 252, 239) !important;
    color: rgb(0, 102, 68) !important;
  `}
  ${({ isFirstColumn }) => isFirstColumn && css`
    color: rgb(66, 82, 110) !important;
    background-color: rgb(223, 225, 230) !important;
  `}
`
export const DropDownMenu = styled.div`
  margin-top: 5px;
  box-shadow: 0 4px 8px -2px rgba(9, 30, 66, .25), 0 0 1px rgba(9, 30, 66, .31);
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  z-index: 999;
  min-width: 220px;
`
export const ListItem = styled.li`
    font-size: 12px;
    span {
      color: rgb(7, 71, 166);
      padding: 1px 5px;
      border-radius: 5px;
      font-weight: 700;
      background-color: rgb(222, 235, 255);
    }
    padding: .85rem .75rem;
    &:hover{
      background-color: rgb(222, 235, 255);
      cursor: pointer;
  }
`
export const Span = styled.span`
  /* Project Icon */
  ${({ isLastColumn }) => isLastColumn && css`
    background-color: rgb(227, 252, 239) !important;
    color: rgb(0, 102, 68) !important;
  `}
  ${({ isFirstColumn }) => isFirstColumn && css`
    color: rgb(66, 82, 110) !important;
    background-color: rgb(223, 225, 230) !important;
  `}

`