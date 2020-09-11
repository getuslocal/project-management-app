import styled from 'styled-components'
import Icon from '../../../../shared/components/Icon/Icon';

// @todo : remove this if not needed.
export const Container = styled.div`

`

export const ProjectBoardTopContent = styled.div`
display: flex;
align-items: center;
padding: 0 3em;
margin-bottom: 1.5em;
`
export const ProjectName = styled.p`
color: rgb(107, 119, 140);
font-size: 14px;
font-weight: 500;
margin-right: 1.5em;
`
export const SearchInputContainer = styled.div`
  position: relative;
  margin-right: 1.5em;

  &:after{
    color: rgb(94, 108, 132);
    font-size: 13px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
`
export const SearchInput = styled.input`
  background-color: rgb(250, 251, 252);
  padding: 7px;
  font-size: 14px;  
  padding-right: 25px;
  border: none;
  background-color: rgb(250, 251, 252);
  border-radius: 3px;
  border: 2px solid rgb(223, 225, 230);
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
  &:focus {
    background-color: #fff;
    border-color: rgb(76,154,255);
  }
`

export const TopContentLeft = styled.div`
display: flex;
align-items: center;
border-right: 1px solid #dfe1e6;
`
export const CreateIssueButton = styled.button`
  background-color: rgb(0, 82, 204);
  border-radius: 3px;
  color:#fff;
  padding: .6em;
  font-size: 14px;
  font-weight: 500;
  margin-right: 1.5em;
  
  &:hover{
    opacity: .9;
    cursor: pointer;
  }
`
export const TopContentRight = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1.5em;
`
export const Members = styled.div`
  margin-right: 1em;
`

export const ClearButton = styled.button`
  color: rgb(66, 82, 110);
  font-size: 14px;
  font-weight: 500;
  padding: .6em;
  border-radius: 3px;

  &:hover{
    background-color: rgba(9, 30, 66, 0.08);
  }
`

export const IconList = styled.li`
  display: inline-block;
  position: relative;

  &:not(:first-child){
    margin-left: -6px;
  }

  &:hover{
    transform: translateY(-4px);
    transition: all .2s;
    z-index: 100;
    cursor: pointer;
  }

`

export const CustomIcon = styled(Icon)`
  margin: 0;
  &:before{
  border: 2px solid #fff;
  box-shadow: ${props => (props.isActive ? 'rgb(0,82,204) 0px 0px 0px 2px' : 'none')} ;
}
`