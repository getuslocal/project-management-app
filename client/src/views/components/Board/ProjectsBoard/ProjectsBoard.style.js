import styled from 'styled-components'

// @todo : remove this if not needed.
export const Container = styled.div`

`

export const ProjectBoardTopContent = styled.div`
display: flex;
align-items: center;
`
export const ProjectName = styled.p`
color: rgb(107, 119, 140);
font-size: 14px;
font-weight: 500;
margin-right: 1.5em;
`
export const SearchInputContainer = styled.div`
  border:none;
  display: inline-block;
  background-color: rgb(250, 251, 252);
  border-radius: 3px;
  border: 2px solid rgb(223, 225, 230);
  color: rgb(9, 30, 66);
  font-size: 14px;
  padding: 6px;

  &:after{
    color: rgb(94, 108, 132);
    font-size: 13px;
  }
`
export const SearchInput = styled.input`
  border: none;
  background-color: rgb(250, 251, 252);
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