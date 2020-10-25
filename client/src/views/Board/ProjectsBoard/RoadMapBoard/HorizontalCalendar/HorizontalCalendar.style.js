import styled, { css } from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const Container = styled.div`
  display: flex;
  flex-wrap: none;
  position: relative; // For current offsetLeft value.
  padding-top: 3px;
  margin-bottom: 20px;
`

export const DayCell = styled.div`
  /* text-align: center; */
  align-self: flex-end;
  min-width: 50px;
  width: 50px;
  font-size: 12.5px;
  font-weight: 500;
  /* background: ${color.backgroundLightest}; */
`
export const MonthName = styled.p`
  color: ${color.textVeryLight};
  font-weight: 600;
  text-transform:uppercase;
`

export const Day = styled.div`
  position: relative;
  color: ${color.textMedium};
  font-weight: 600;

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
  left: 0;

  ${props => props.isWeekend && css`
    &::after{
      content: "";
      position: absolute;
      height: 100%;
      width: 48px;
      top: 0;
      left: 2px;
      background-size: auto auto;
      background-image: repeating-linear-gradient(146deg, transparent, transparent 6px, rgba(211, 212, 213, 0.36) 6px, rgba(211, 212, 213, 0.36) 7px );
    }
  `}
`

export const DayName = styled.span`
  color: ${color.textLight};
  margin-right: 5px;
  font-weight: 500;
`