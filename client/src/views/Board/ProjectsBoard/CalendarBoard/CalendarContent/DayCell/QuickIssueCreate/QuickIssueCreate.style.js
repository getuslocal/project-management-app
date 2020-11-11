import styled, { css } from 'styled-components'
import { color, zIndexValues } from '../../../../../../../shared/utils/styles'

export const Container = styled.div`
  padding: 12px 12px 0;
  border-radius: 10px;
  position: absolute;
  top: -30px;
  left: calc(100% + 17px);
  width: 280px;
  background-color:${color.lightBlue200};
  z-index: ${zIndexValues.dropdown};
  color: ${color.textDark};
  font-weight: 500;

  &:before{
    content: "";
    position: absolute;
    top: 50%;
    left: -30px;
    margin-top: -15px;
    border: 15px solid transparent;
    border-right: 15px solid ${color.lightBlue200};
  }
  
  ${prop => prop.isLeftPosition && css`
    left: auto;
    right: calc(100% + 17px);

    &:before {
      left: 100%;
      border: 15px solid transparent;
      border-left: 15px solid ${color.lightBlue200};
    }
  `}
`

export const TextArea = styled.textarea`
  font-size: 14px;
  border: none;
  width: 100%;
  height: 70px;
  background-color:${color.lightBlue200};
`

export const DropDownMenu = styled.div`
  display: inline-block;
  position: relative;
`

export const DueDate = styled.p`
  padding: 9px 0;
  border-top: 1px solid rgba(0,0,0, .085);
  border-bottom: 1px solid rgba(0,0,0, .085);
  font-size: 13.5px;
  color: ${color.textDark};
  
  & > span {
    margin-right: 5px;
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  &:hover{
    cursor: pointer;
  }
`

export const DropDownContent = styled.div`
`
export const Bottom = styled.div`
  padding: 9px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Button = styled.input`
  border: none;
  background-color: transparent;
  font-size: 12px;
  padding: 5px;
  font-weight: 500;
  border-radius: 3px;
  color: ${color.blue};
  cursor: pointer;

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
`

export const AngleDownIcon = styled.span`
  margin-left: 10px;
`
export const IconCont = styled.span`
  margin-right: 10px;
`