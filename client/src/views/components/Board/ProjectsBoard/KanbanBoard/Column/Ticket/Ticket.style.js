import styled from 'styled-components'

export const Container = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 12px;
  color: rgb(23, 43, 77);
  margin: 4px 0px;
  border-radius: 3px;
  box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;
  background-color: ${props => (props.isDragging ? 'rgb(222 ,235, 255)' : 'white')} ;

  cursor: pointer;
  &:hover{
    background-color: rgb(244, 245, 247);
  }
`

export const TicketSummary = styled.p`
  margin-bottom: 8px;
  font-size: 15px;
`
export const TicketStatus = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: rgb(122, 134, 154);  
  display: flex;
  align-items: center;
  &:before{
    margin-right: .75em;
  }
`