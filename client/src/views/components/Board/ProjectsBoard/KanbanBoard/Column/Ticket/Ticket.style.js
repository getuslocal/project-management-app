import styled from 'styled-components'

export const Container = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 12px;
  color: rgb(23, 43, 77);
  margin: 4px 0px;
  border-radius: 3px;
  box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;
  background-color: ${props => (props.isDragging ? 'rgb(222 ,235, 255)' : 'white')} ;
`