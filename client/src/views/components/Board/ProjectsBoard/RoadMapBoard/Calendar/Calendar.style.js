import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 650px;
  max-height: 650px;
  overflow-y: scroll;
  position: relative;
`

export const Week = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 20%;
`

export const DayCell = styled.div`
  width: 100%;
  min-height: 130px;
  height: 100%;
  text-align: right;
  border-left: 2px solid rgba(166, 168, 179, 0.12);
  border-bottom: 2px solid rgba(166, 168, 179, 0.12);
  color: rgba(0, 0, 0, 0.2);
  font-size: 14px;

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

export const Content = styled.div`
  height: 100%;
  `

export const Header = styled.div`
padding: 8px;
padding-top: ${(props) => props.isToday && '6px'};
`