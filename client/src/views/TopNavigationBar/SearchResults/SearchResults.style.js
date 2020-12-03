import styled from 'styled-components'
import { color, zIndexValues } from '../../../shared/utils/styles'

export const Container = styled.div`
  position: absolute;
  margin-top: 8px;
  right: 0;
  width: 580px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px, rgba(9, 30, 66, 0.31) 0px 0px 1px;
  border-radius: 3px;
  background-color: ${color.white};
  z-index: ${zIndexValues.modal};
  max-height: 600px;
  overflow-y: auto;
`

export const List = styled.li`
  display: flex;
  padding: 9px 10px;
  cursor: pointer;

  & > i {
    margin-right: 10px;
  }

  &:hover{
    background-color:${color.backgroundLightest};
  }
`

export const Summary = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1;

  & > span {
    color:${color.textMedium};
    margin-right: 7px;
    font-size: 13.5px;
  }
`

export const ProjectName = styled.p`
    font-size: 11.5px;
    color:${color.textMedium};
    font-weight: 500;
`
