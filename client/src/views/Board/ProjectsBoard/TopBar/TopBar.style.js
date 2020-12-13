import styled from 'styled-components'
import Icon from '../../../../shared/components/Icon/Icon';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;
  min-height: 40px;
`;

export const Breadcrumbs = styled.p`
color: rgb(107, 119, 140);
font-size: 14px;
font-weight: 500;
margin-right: 1.5em;
`

export const Left = styled.div`
display: flex;
align-items: center;
border-right: 1px solid #dfe1e6;
`
export const ModalButton = styled.button`
  border-radius: 3px;
  color:#fff;
  font-size: 14px;
  font-weight: 500;
  margin-right: 24px;
  width: 105px;
  height: 35px;

  &:hover{
    opacity: .9;
    cursor: pointer;
  }

  background-color: ${({ isEpicModal }) => isEpicModal ? '#6554c0' : 'rgb(0, 82, 204)'} ;
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