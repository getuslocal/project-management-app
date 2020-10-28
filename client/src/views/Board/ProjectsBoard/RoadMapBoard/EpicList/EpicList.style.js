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
  min-width: 346px;
  width: 346px;
  max-width: 346px;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 220px;
`

export const Due = styled.p`
  font-size: 10px;
  color: ${color.textMedium};
`

export const Status = styled.p`
  font-size: 10px;
  font-weight: 600;
  color: rgb(7,71,166);
  background-color: rgb(222,235,255);
  padding: 2px 5px;
  margin-left: auto;
  border-radius: 3px;

  ${props => props.isFirstColumn && css`
    color: ${color.textDark};
    background-color: ${color.backgroundMedium};
  `}

  ${props => props.isDone && css`
    color: ${color.success};
    background-color: rgb(227,252,239);
  `}
`

export const ChildIssueContainer = styled.div`
  position: relative;
  padding-top: 10px;
`
