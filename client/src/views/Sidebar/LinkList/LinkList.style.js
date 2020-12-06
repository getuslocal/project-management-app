import styled, { css } from 'styled-components';
import { color } from '../../../shared/utils/styles';

export const SidebarList = styled.li`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  position: relative;
  /* margin-bottom: 14px; */

  &:last-of-type {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  & > a, 
  & > span {
    font-size: 13.5px;
    font-weight: 600;
    display: flex;
    align-items: center;
    padding: 23px 16px;
    padding-left: calc(16px - 4px);
    width: 100%;
    border-left: solid 4px transparent;

    & > i {
      margin-right: 10px;
      /* color: rgba(255, 255, 255, 0.6); */

      &.sort-down{
        float: right;
        margin-left: auto;
        color: ${color.white};
      }
    }
    
    &:hover,
    &.active {
      color: ${color.lightBlue};
      & > i  {
        color: ${color.lightBlue};
      }
    }

    &.active {
      border-left-color: ${color.lightBlue};
    }
  }

  ${props => props.isOpen && css`
    .sort-down {
      transform: rotate(180deg);
      &::before{
        position: relative;
        top: -3px;
      }
    }
  `};
`;

export const SidebarSubList = styled.ul`
  padding: 0;
  border: none;
  max-height: 0;
  opacity: 0;
  transition: all .3s;
  overflow: hidden;

  &.is-open{
    max-height: 1000px;
    opacity: 1;
  }

  li {
    border: none;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    
    a {
      padding: 20px 16px;
      display: flex;
      align-items: center;

      & > i {
        margin-right: 10px;

        &.project-icon {
          &:before{
            border: 1px solid ${color.white};
          }
        }
      }
    }

    &:hover{
      color: #8CD7F8;
    }
  }
`