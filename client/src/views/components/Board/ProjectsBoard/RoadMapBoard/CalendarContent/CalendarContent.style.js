import styled, {css} from 'styled-components';

export const Container = styled.div`
    padding: 1px 0 0;
    height: 650px;
    max-height: 650px;
    overflow-y: scroll;
`

export const InnerContainer = styled.div`
height: 100%;
`

export const InnerRef = styled.div`
`
export const Content = styled.div`
padding: 8px;
`

export const DayCell = styled.div`
      text-align: right;
      border-left: 2px solid #ddd;
      border-bottom: 2px solid #ddd;
      color: rgba(0, 0, 0, 0.3);

      &:last-child {
        border-right: 2px solid #ddd;
      }

      &.gray {
        color: rgb(190, 190, 190);
      }


      ${(props) =>
      props.isFocused && css`
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
    `};

      ${(props) =>
      props.isWeekEnd && css`
        background: rgb(247, 246, 243);
    `};

      ${(props) =>
      props.isToday && css`
        color: #0052cc;
        /* padding-top: 5px;
        padding-right: 5px; */

        span{
          /* padding: .5rem; */
          width: 25px;
          display: inline-block;
          height: 25px;
          line-height: 25px;
          text-align: center;
          background-color: #0052cc;
          border-radius: 50%;
          color: #fff;
        }
        /* border-top: 3px solid #0052cc; */
    `};

      &:hover {
        background-color: rgba(9, 30, 66, 0.04);
        cursor: pointer;
      }
`