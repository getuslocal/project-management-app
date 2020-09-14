import styled, {css} from 'styled-components';

export const Container = styled.div`
    padding: 1px 0;
`

export const InnerContainer = styled.div`
`

export const InnerRef = styled.div`
`
export const Content = styled.span`
`

export const DayCell = styled.div`
      text-align: left;
      border-left: 2px solid #ddd;
      border-bottom: 2px solid #ddd;
      color: rgba(0, 0, 0, 0.7);

      &:last-child {
        border-right: 2px solid #ddd;
      }

      &.gray {
        color: rgb(190, 190, 190);
      }
      border-top: ${(props) => props.isFirstDayOfMonth && '3px solid #6f7782'};

      ${(props) =>
      props.isToday && css`
        color: #0052cc;
        font-weight: 600;
        border-top: 3px solid #0052cc;
    `};

      &:hover {
        background-color: rgba(9, 30, 66, 0.04);
        cursor: pointer;
      }
`