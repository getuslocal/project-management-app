import styled, { css } from 'styled-components';

export const Container = styled.div`
    height: 650px;
    max-height: 650px;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(7, 14.28%);
    grid-auto-rows: 130px;
`

export const InnerContainer = styled.div`
`

export const InnerRef = styled.div`
`
export const Content = styled.div`
height: 100%;
padding: 8px;
padding-top: ${(props) => props.isToday && '6px'};
`

export const DayCell = styled.div`
      text-align: right;
      border-left: 2px solid rgba(166, 168, 179, 0.12);
      border-bottom: 2px solid rgba(166, 168, 179, 0.12);
      color: rgba(0, 0, 0, 0.2);
      font-size: 14px;

      &:last-child {
        border-right: 2px solid rgba(166, 168, 179, 0.12);
        margin-right: -2px;
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
    /* background: rgba(247, 246, 243,.8); */
    background: rgba(0, 0, 0,.02);
  }

      ${(props) =>
        props.isToday && css`
        color: #0052cc;

        &::before{
          content: '';
          display: block;
          border-top: 2px solid #0052cc;
        }
    `};

      &:hover {
        background-color: rgba(9, 30, 66, 0.04);
        cursor: pointer;
      }
`