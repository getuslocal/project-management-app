import styled, { css } from 'styled-components'
import { color } from '../../../../../../shared/utils/styles'
import Icon from '../../../../../../shared/components/Icon/Icon'

export const Container = styled.div`
  min-height: 75px;
  width: 278px;
  user-select:none;
  padding: 0 16px;
  position: absolute; 
  left: 10px; 
  top: auto;
  border-radius: 7px;
  background-color: ${props => props.backgroundColor};

  &:before{
    padding-top: 100%;
  }
`

export const Top = styled.div`
  display: flex;
  align-items: center;
  height: 75px;
  padding-top: 10px;
  padding-bottom: 10px;
  /* &:hover{
    .new-child-issue-button {
      display: block;
    }
  } */
`

export const Bottom = styled.div`
`

export const OpenIcon = styled.p`
  margin-right: 10px;
  cursor: pointer;
  background-color: ${props => props.backgroundColor};
  color: #fff;
  height: 17px;
  line-height: 17px;
  min-width: 17px;
  width: 17px;
  text-align: center;
  border-radius: 3px;
  
  ${props => props.isOpen && css`
    & > i {
      transition: all .3s;
      transform:rotateX(180deg);
      &:before{
        position: relative;
        top: 1px;
      }
    }
  `}
`

export const Title = styled.p`
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 200px;
  margin-bottom: 8px;
  &:hover{
    color: ${color.textDark}
  }
`

export const Progress = styled.p`
  font-size: 11.5px;
  font-weight: 500;
  color: ${color.textMedium};

  & > span {
    color: ${color.textDark};
  }
`

export const NewChildIssueButton = styled.div`
  margin-left: auto;
  display: none;
  & > i {
    &:before {
      cursor: pointer;
      background-color: ${color.backgroundMedium};
      height: 24px;
      line-height: 24px;
      width: 24px;
      text-align: center;
      display: inline-block;
      border-radius: 5px;
      color: ${color.textDark};
      box-shadow: 0 1px 4px 1px rgba(0,0,0,.1);
    }
  }
`

export const ChildIssueDetail = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0,0,0, .1);
  font-size: 12px;
  font-weight: 500;
  padding: 0 10px;
  .user-icon{
    margin-left: auto;
  }
`

export const CheckIcon = styled(Icon)`
  margin-right: 10px;
  color: ${props => props.isDone ? color.success : 'rgba(0,0,0, .35)'};
`

export const ChildIssueTitle = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 170px;
  &:hover{
    color: ${color.textDark};
    cursor: pointer;
  }
`

export const NoIssuesMessage = styled.p`
  min-height: 50px;
  height: 50px;
  max-height: 50px;
  line-height: 50px;
  border-top: 1px solid rgba(0,0,0, .1);
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: ${color.textDark};
`