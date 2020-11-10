import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border-left: 2px solid rgba(166, 168, 179, 0.12);
  border-bottom: 2px solid rgba(166, 168, 179, 0.12);
  color: rgba(0, 0, 0, 0.2);
  font-size: 14px;
  /* overflow-y: scroll; */

  ${props => props.isViewed && css`
    color: rgba(0, 0, 0, 0.7);
    font-weight: 500;
  `}

  ${(props) => props.isToday && css`
    color: #0052cc;
    &::before{
      content: '';
      display: block;
      border-top: 2px solid #0052cc;
    }
  `}

  &:nth-child(7n+1),
  &:nth-child(7n) {
    background: rgba(0, 0, 0,.02);
  }

  &:hover {
    .quick-add-button{
      cursor: pointer;
      display: block;
    }
  }
`

export const Content = styled.div`
  height: 100%;
`

export const Header = styled.div`
  padding: 8px;
  padding-top: ${(props) => props.isToday && '6px'};
  text-align: right;
`

export const QuickAddButton = styled.span`
  float: left;
  display: none;

  &.icon-plus{
    &:before{
    font-size: 12px;
    padding: 4px 5px;
    box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px;
    color: #8993a4;
    border-radius: 3px;
    }
  }
`