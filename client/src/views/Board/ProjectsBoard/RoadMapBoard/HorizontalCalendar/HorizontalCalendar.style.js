import styled, { css } from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const Container = styled.div`
  display: flex;
  flex-wrap: none;
`

export const DayCell = styled.div`
  text-align: center;
  align-self: flex-end;
  min-width: 50px;
  width: 50px;
  font-size: 12.5px;
  font-weight: 500;
`

export const Day = styled.div`
position: relative;

  ${props => props.isToday && css`
    color: ${color.blue};
    font-weight: 600;

    ${DayName} {
      color: ${color.blue};
    }
    ${Border} {
      background-color: ${color.blue};
      &:before {
        content: "";
        position: absolute;
        height: 8px;
        width: 8px;
        top: 0px;
        left: -3px;
        border-radius: 50%;
        background-color: ${color.blue};
      }
    }
  `}
`

export const Border = styled.div`
  width: 2px;
  height: 800px;
  background-color: ${color.borderLightest};
  position: absolute;
  top: 25px;
  left: 25px;
`

export const DayName = styled.span`
  color: ${color.textLight};
  margin-right: 5px;
`