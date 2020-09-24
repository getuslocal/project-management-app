import styled, {css}  from 'styled-components'

export const CreateTicketButton = styled.div`
  padding: .75em;
  border-radius: 3px;
  font-size: 14px;
  color: transparent;
  &:hover{
    background-color: rgba(9, 30, 66, 0.08);
    cursor: pointer;
  }

  /* If it is a first column, display the button by default. */
  ${({ isFirstColumn }) => isFirstColumn && css`
    display: block;
    color: inherit;
  `}
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 5px;
  min-height: 400px;
  width: 25%;
  border-radius: 3px;
  background: rgb(244, 245, 247);
  box-shadow: ${props => (props.isDragging ? 'rgba(0, 0, 0, 0.2) 0 3px 3px 0' : 'none')};

  &:hover{
    ${CreateTicketButton} {
      display: block;
      color: inherit;
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
`

export const Title = styled.p`
  font-weight: 500;
  color: rgb(94, 108, 132);
  font-size: 14px;
  padding: 10px;
`

export const TicketsList = styled.div`
  flex-grow: 1;
  min-height: 100px;
`

export const Counter = styled.span`
  margin-left: 1em;
  font-size: 0.875em;
`
