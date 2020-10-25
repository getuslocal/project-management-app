import styled, { css } from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const Row = styled.div`
  width: 30000px;
  margin-bottom: 50px;
`

export const DraggableWrapper = styled.div`
  position: relative; 
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
  position: relative; 
  z-index: 10;
  top: 20px;
  font-weight: 500;
  font-size: 13.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${color.white};

  ${props => props.isChildIssuesVisible && css`
    &::after{
      content:"";
      z-index: -1;
      position: absolute;
      width: 2px;
      height: calc(98px);
      top: 36px;
      left: 23px;
      background-color: ${props => props.progressColor};
    }
  `}
`

export const ResizeBar = styled.span`
  position: absolute; 
  display: inline-block;
  width: 10px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  z-index: 100;
  top: 20px;
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
  width: 298px;
  max-width: 298px;
  /* width: calc(100% - 50px); */
  margin-top: 22px;
  background-color: #ffdde4;
  /* background-color: ${color.backgroundLightest}; */
  border-left: 7px solid #fd7993;
  border-radius: 5px;
  left: 50px;
  padding: 2px 5px;
  position: relative;
  top: 20px;
  display: flex;
  align-items: center;
  & > i {
    margin-right: 5px;
    vertical-align: middle;
  }

  &::before{
    content:"";
    position: absolute;
    width: 25px;
    height: 2px;
    left: -32px;
    /* top: 0; */
    /* left: 25px; */
    background-color: #fd7993;
  }
`

export const ChilsIssueSummary = styled.div`
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
`
export const EpicTitle = styled.p`
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 500;
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
`

export const Bottom = styled.div`
`

export const ChildIssueDetail = styled.div`
  padding: 12px 12px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  border-top: 1px solid rgba(0,0,0, .1);
  font-size: 13.5px;
  font-weight: 500;

  .square{
    color: rgba(0,0,0, .35);
    margin-right: 10px;
  }
  .user-icon{
    margin-left: auto;
  }
`