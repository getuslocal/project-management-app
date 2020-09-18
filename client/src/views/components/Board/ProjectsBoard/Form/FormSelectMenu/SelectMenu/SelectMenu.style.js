import styled, { css }  from 'styled-components'

export const Container = styled.div`
  margin-top: 5px;
  box-shadow: 0 4px 8px -2px rgba(9, 30, 66, .25), 0 0 1px rgba(9, 30, 66, .31);
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  z-index: 999;
  width: ${props => props.width ? props.width : '100%'};
`

export const MainContent = styled.div`
    &:not(:last-child) {
      margin-bottom: 1.25em;
    }

    p {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: .5rem;
      padding: 0 .5em;
    }
`
export const ListItem = styled.li`
  font-size: 14px;
  padding: .5em;
  min-height : 40px;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: rgba(9, 30, 66, 0.05);
  }

  &:before {
    margin-right: .4rem;
    vertical-align: middle;
  }
`
