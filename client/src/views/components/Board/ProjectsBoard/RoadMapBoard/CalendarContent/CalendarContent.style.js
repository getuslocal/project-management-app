import styled, { css } from 'styled-components';

export const Container = styled.div`
    /* padding: 1px 0 0; */
    height: 650px;
    max-height: 650px;
    overflow-y: scroll;
`

export const InnerContainer = styled.div`
`

export const InnerRef = styled.div`
`
export const Content = styled.div`
height: 100%;
padding: 8px;
`

export const DayCell = styled.div`
      text-align: right;
      border-left: 2px solid rgba(166, 168, 179, 0.12);
      border-bottom: 2px solid rgba(166, 168, 179, 0.12);
      color: rgba(0, 0, 0, 0.2);
      font-size: 14px;

      &:last-child {
        border-right: 2px solid rgba(166, 168, 179, 0.12);
      }

      &.gray {
        color: rgb(190, 190, 190);
      }


      ${(props) =>
    props.isFocused && css`
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
    `};


    &:nth-child(7n+1),
    &:nth-child(7n) {
    background: rgba(247, 246, 243,.8);
      }

      ${(props) =>
        props.isToday && css`
        color: #0052cc;

        &::before{
          content: '';
          display: block;
          border-top: 2px solid #0052cc;
        }

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