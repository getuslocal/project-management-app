import styled, { css }  from 'styled-components'

export const Container = styled.div`
  margin-top: 5px;
  box-shadow: 0 4px 8px -2px rgba(9, 30, 66, .25), 0 0 1px rgba(9, 30, 66, .31);
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  z-index: 999;
  width: ${props => props.width ? props.width : '100%'};
  display: ${props => props.isActive ? 'block' : 'none'};
`

export const Lists = styled.ul`
  &:not(:last-child) {
    margin-bottom: 1.25em;
  }
`
export const List = styled.li`
  font-size: 14px;
  padding: 8px;
  min-height : 40px;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: rgba(9, 30, 66, 0.05);
  }
`
