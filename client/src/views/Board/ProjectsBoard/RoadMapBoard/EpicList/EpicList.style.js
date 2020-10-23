import styled from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const Row = styled.div`
  width: 30000px;
  margin-bottom: 50px;
  /* border-bottom: 1px solid ${color.borderLight}; */
`

export const TaskDetail = styled.div`
  min-height: 75px;
  width: 248px;
  padding: 16px;
  position: absolute; 
  left: 10px; 
  top: auto;
  /* border-bottom: 1px solid ${color.borderLight}; */
  border-radius: 7px;
  display: flex;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`

export const Opener = styled.p`
  margin-right: 10px;
  cursor: pointer;
  & > i {
    vertical-align: middle;
    background-color: ${props => props.backgroundColor};
    /* box-shadow: 0 1px 4px 2px rgba(255,255,255,.5); */
    color: #fff;
    padding: 2px 3px;
    border-radius: 3px;
  }
`

export const EpicTitle = styled.p`
  font-size: 14.5px;
  font-weight: 500;
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

export const DraggableWrapper = styled.div`
  position: relative; 
`

export const EpicContainer = styled.div`
  width: ${props => `calc(${props.width}px - 2px)`};
  position: relative;
  left : 2px;
`

export const Epic = styled.div`
  cursor: pointer;
  border-radius: 20px;
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

  &::before{
    content:"";
    z-index: -1;
    position: absolute;
    width: ${props => props.progress}%;
    height: 100%;
    background-color: ${props => props.progressColor};
    top: 0;
    left: 0;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
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
  background: #fff;
  margin-top: 12px;
  background-color: #ffdde4;
  border-left: 7px solid red;
  border-radius: 5px;
  left: 24px;
  padding: 2px;
  padding-left: 5px;
  position: relative;
  top: 20px;
  display: flex;
  align-items: center;
  & > i {
    margin-right: 5px;
    vertical-align: middle;
  }

  /* &::before{
    content:"";
    position: absolute;
    left: 0;
    top: 0;
    width: 7px;
    height: 100%;
    border-radius: 150px;
    background-color: red;
  } */
`

export const ChilsIssueSummary = styled.div`
  font-size: 13.5px;

`

export const Due = styled.p`
  font-size: 10px;
  color: ${color.textLight};
`