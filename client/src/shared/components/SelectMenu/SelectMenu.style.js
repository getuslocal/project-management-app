import styled, { css }  from 'styled-components'
import { zIndexValues } from '../../utils/styles'

export const Container = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px -2px rgba(9, 30, 66, .25), 0 0 1px rgba(9, 30, 66, .31);
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  z-index: ${zIndexValues.modal};
  max-height: 350px;
  overflow-y: auto;
  width: ${props => props.width ? `${props.width}px` : '100%'};
  left: ${props => props.left ? `${props.left}px` : 'auto'};
  top: ${props => props.top ? `${props.top}px` : 'auto'};
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
export const EmptyMessage = styled.p`
  font-size: 14px;
  padding: 8px;
  min-height : 40px;
  display: flex;
  align-items: center;
`
