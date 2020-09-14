import styled, {css} from 'styled-components'
import Icon from '../../../../../shared/components/Icon/Icon';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
  min-height: 40px;
`;

export const Breadcrumbs = styled.p`
color: rgb(107, 119, 140);
font-size: 14px;
font-weight: 500;
margin-right: 1.5em;
`

export const InputContainer = styled.div`
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
export const Input = styled.input`
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

export const Left = styled.div`
display: flex;
align-items: center;
border-right: 1px solid #dfe1e6;
`
export const ModalButton = styled.button`
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

  background-color: ${({renderStyle}) => renderStyle == "RoadMapBoard" ? 'purple' : 'rgb(0, 82, 204)'} ;
`
export const Right = styled.div`
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