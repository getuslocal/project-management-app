import styled, { css } from 'styled-components'
import { color } from '../../../../shared/utils/styles'

export const Container = styled.div`
  /* height: 100%; */
  /* max-height: 100%; */
  /* min-height: calc(100vh - 204px); */
  width: 100%;
  display: flex;
  position: relative;
  border: 2px solid ${color.borderLight};
  border-radius: 5px;
  flex: none;

  &:before{
    content: "";
    width: 2px;
    height: 100%;
    background-color:${color.borderLight};
    position: absolute;
    left: 298px;
    display: inline-block;
  }
`

export const Left = styled.div`
  width: 300px;
  min-width: 300px;
  height: 100%;
`

export const Right = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  min-height: calc(100vh - 208px);
`

export const TopLeftContent = styled.div`
  height: 50px;
  padding-right: 12px;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ViewButton = styled.div`
  /* background-color: ${color.backgroundMedium}; */
  /* border-radius: 5px; */
  padding: 2px;

  & > p {
    font-weight: 500;
    color: ${color.textMedium};
  }
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
  /* height: 35px; */
  height: 37px;
  /* width: 80px; */
  width: 100px;
  font-weight: 500;
  font-size: 13.5px;
  color: ${color.textMedium};
  background-color: ${color.backgroundMedium};

  &:hover{
    color: ${color.textLight};
  }
`

export const ButtonWrapper = styled.div`
  height: 45px;
  margin-bottom: 8px;
`

export const NewEpicButton = styled.button`
  border-radius: 5px;
  height: 45px;
  width: 278px;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  padding: 0 16px;
  color: ${color.textMedium};
  background-color: ${color.backgroundLight};
  position: absolute;
  left: 10px;
  top: auto;

  & > i {
    margin-right: 7px;
  }

  &:hover{
    color:${color.textLight};
  }
`
