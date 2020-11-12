import styled, { css } from 'styled-components';
import { color } from '../../../../../../shared/utils/styles';

export const Container = styled.div`
  width: calc(100% / 7);
  max-width: calc(100% / 7);
  min-height: 190px;
  border-left: 2px solid ${color.borderLightest};
  border-bottom: 2px solid ${color.borderLightest};

  &:nth-child(7n+1),
  &:nth-child(7n) {
    background: rgba(0, 0, 0,.03);
  }
`

export const Content = styled.div`
  height: 100%;
  font-weight: 500;
  position: relative;

  ${(props) => props.isFirstDay && css`
    ${Header}{
      font-weight: 600;
      padding-top: 6.5px;
      padding-bottom: 6.5px;
    }
    &::before{
      content: '';
      display: block;
      border-top: 3px solid ${color.textMedium};
    }
  `}

  ${(props) => props.isToday && css`
    color: ${color.blue};
    ${Header}{
      color: ${color.blue};
      font-weight: 600;
      padding-top: 6.5px;
      padding-bottom: 6.5px;
    }
    &::before{
      content: '';
      display: block;
      border-top: 3px solid ${color.blue};
    }
  `}

  &:hover {
    .quick-add-button{
      cursor: pointer;
      display: block;
    }
  }
`

export const Header = styled.div`
  padding: 8px 10px;
  padding-top: ${(props) => props.isToday && '6px'};
  text-align: right;
  font-size: 14px;
`

export const QuickAddButton = styled.span`
  float: left;
  display: none;
  background-color: ${color.white};
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
export const MonthName = styled.span`
  margin-right: 10px;
`

export const Task = styled.div`
  border-radius: 2px;
  margin: 0 3px;
  padding: 1px 4px;
  min-height: 32px;
  height: 32px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(21,27,38,.08);
  border: 1px solid ${color.borderMedium};
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${color.textDarkest};
  background-color: ${color.white};
  margin-bottom: 5px;
  overflow: hidden;

  & > i {
    margin-right: 5px;
  }

  &:hover{
    background-color:${color.lightBlue200};
  }
  
  /* For EPIC */
  ${({colorProps}) => colorProps && css`

    color: ${colorProps.font};
    background-color: ${colorProps.bg};

    &:hover{
      background-color: ${colorProps.bg};
      opacity: 0.85;
    }
  `}
`

export const Summary = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
