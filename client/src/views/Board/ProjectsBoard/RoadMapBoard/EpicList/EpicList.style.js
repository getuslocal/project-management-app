import styled, { css } from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const Row = styled.div`
  height: 75px;
  margin-bottom: 16px;
`

export const DraggableWrapper = styled.div`
  position: relative; 
  top: 20px;
`

export const EpicContainer = styled.div`
  width: ${props => `calc(${props.epicWidth}px - 2px)`};
  position: relative;
  left : 2px;
`

export const Epic = styled.div`
  cursor: pointer;
  border-radius: 5px;
  margin-left: 1px;
  margin-right: 1px;
  padding: 10px 15px; 
  font-weight: 500;
  font-size: 13.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${color.white};
`

export const ResizeBar = styled.span`
  position: absolute; 
  top: 0;
  display: inline-block;
  width: 10px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  z-index: 100;
  cursor: ew-resize;

  & > i {
    color: ${color.white};
  }

  &.left-resize-bar {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    left:  1px;
  }

  &.right-resize-bar {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    right: 1px;
  }
`

export const Summary = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  margin-right: 3px;
`

export const Progress = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${color.textMedium};
`

export const ChildIssue = styled.div`
  min-width: 296px;
  width: 296px;
  max-width: 296px;
  margin-right: 1px;
  margin-left: 1px;
  margin-top: 16px;
  border-radius: 5px;
  padding: 2px 5px;
  position: sticky;
  left: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  & > i {
    margin-right: 5px;
    vertical-align: middle;
  }
`

export const ChildIssueSummary = styled.div`
  font-size: 12px;
  font-weight: 500;
`

export const Due = styled.p`
  font-size: 10px;
  color: ${color.textMedium};
`
export const Status = styled.p`
  font-size: 10px;
  font-weight: 600;
  color: ${color.textDark};
  background-color: ${color.backgroundMedium};
  padding: 2px 5px;
  margin-left: auto;
  border-radius: 3px;
`

// 


export const TaskDetail = styled.div`
  min-height: 75px;
  width: 278px;
  user-select:none;
  padding: 0 16px;
  position: absolute; 
  left: 10px; 
  top: auto;
  /* border-bottom: 1px solid ${color.borderLight}; */
  border-radius: 7px;
  background-color: ${props => props.backgroundColor};

  &:before{
    padding-top: 100%;
  }
`
export const EpicTitle = styled.p`
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 200px;
  &:hover{
    color: ${color.textDark}
  }
`
export const ProgressText = styled.p`
  font-size: 11.5px;
  font-weight: 500;
  color: ${color.textLight};

  & > span {
    font-weight: 600;
  }
`

export const Members = styled.div`
  margin-left: auto;
  & > span {
    margin-left: -6px;
    & > i::before {
      border: 2px solid #fff;
    }
  }
`

export const Opener = styled.p`
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

export const Bottom = styled.div`
`

export const ChildIssueDetail = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0,0,0, .1);
  font-size: 12px;
  font-weight: 500;
  padding: 0 10px;

  .square{
    color: rgba(0,0,0, .35);
    margin-right: 10px;
  }
  .user-icon{
    margin-left: auto;
  }
`

export const ChildIssueTitle = styled.p`
  &:hover{
    color: ${color.textDark};
    cursor: pointer;
  }
`
export const ChildIssueContainer = styled.div`
  position: relative;
  padding-top: 10px;
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