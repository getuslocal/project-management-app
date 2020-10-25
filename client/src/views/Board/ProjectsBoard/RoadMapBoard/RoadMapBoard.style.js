import styled, { css } from 'styled-components'
import { color } from '../../../../shared/utils/styles'

export const Container = styled.div`
  height: 765px;
  width: 100%;
  display: flex;
  position: relative;
  border: 2px solid ${color.borderLight};
  border-radius: 5px;
`

export const Left = styled.div`
  width: 300px;
  min-width: 300px;
  height: 100%;
  border-right: 2px solid ${color.borderLight};
`

export const TopLeftContent = styled.div`
  /* border-bottom: 2px solid ${color.borderLight}; */
  height: 50px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const TopText = styled.p`
  line-height: 50px;
  font-weight: 600;
  color: ${color.textDark};
  font-size: 14px;
`

export const ViewButton = styled.div`
  background-color: ${color.backgroundMedium};
  border-radius: 5px;
  padding: 2px;
`

export const Option = styled.p`
  padding: 7px 22px;
  display: inline-block;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  color: ${color.textLight};
  font-weight: 600;

  &:hover{
    cursor: pointer;
    opacity: ${props => props.isActive ? '1': '.8'};
  }

  ${props => props.isActive && css`
    color: ${color.textMedium};
    background-color: ${color.white};
    box-shadow: rgba(23,43,77,0.2) 0px 1px 1px, rgba(23,43,77,0.2) 0px 0px 1px;
  `};
`
export const TodayButton = styled.button`
  border-radius: 5px;
  height: 35px;
  width: 80px;
  font-weight: 500;
  font-size: 13.5px;
  color: ${color.textMedium};
  background-color: ${color.backgroundMedium};

  &:hover{
    color: ${color.textLight};
  }
`

export const Right = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  /* background: rgba(224, 224, 224, .1); */
`
