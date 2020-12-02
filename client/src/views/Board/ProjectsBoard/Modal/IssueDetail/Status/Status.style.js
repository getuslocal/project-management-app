import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin-bottom: 20px ;
  position: relative;
`

const firstColumnStyle = css`
  color: rgb(66, 82, 110) !important;
  background-color: rgb(223, 225, 230) !important;
`
const lastColumnStyle = css`
  background-color: rgb(227, 252, 239) !important;
  color: rgb(0, 102, 68) !important;
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
  ${({ isFirstColumn }) => isFirstColumn && firstColumnStyle}
  ${({ isDoneColumn }) => isDoneColumn && lastColumnStyle}
`

export const StyledText = styled.span`
  color: rgb(7, 71, 166);
  padding: 5px 10px;
  border-radius: 3px;
  font-weight: 700;
  background-color: rgb(222, 235, 255);
  font-size: 12px;
  ${({ isFirstColumn }) => isFirstColumn && firstColumnStyle}
  ${({ isDoneColumn }) => isDoneColumn && lastColumnStyle}
`