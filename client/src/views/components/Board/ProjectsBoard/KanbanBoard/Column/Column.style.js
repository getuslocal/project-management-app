import styled, {css}  from 'styled-components'

export const Container = styled.div`
  min-width: 300px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-self: auto;
  flex: 1 1 auto;
  `

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

export const Content = styled.div`
  background-color: rgb(244, 245, 247);
  border-radius: 6px;
  margin-left: 6px;
  margin-right: 6px;
  display: flex;
  flex-direction: column;
  align-self: auto;
  flex: 1 1 auto;
  min-width: 288px;
  max-width: 288px;
  padding: .5em;
  box-shadow: ${props => (props.isDragging ? 'rgba(0, 0, 0, 0.2) 0 3px 3px 0' : 'none')};

  &:hover{
    ${CreateTicketButton} {
      display: block;
      color: inherit;
    }
  }
  `
export const Title = styled.p`
    font-weight: 500;
    color: rgb(94, 108, 132);
    font-size: 14px;
    padding: .5em;
    margin-bottom: .5em;
`

export const TicketsList = styled.div`
  flex-grow: 1;
  min-height: 100px;
`

export const ButtonContainer = styled.div`

`
