import styled from 'styled-components';

export const SidebarList = styled.li`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 13px;
  font-weight: 600;
  position: relative;
  &:last-of-type {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  &:hover,
  &.active {
    color: #8cd7f8;
    border-left: solid 4px #8cd7f8;
    cursor: pointer;
    a,
    span {
      &:before {
        color: #8cd7f8;
      }
    }
  }

  &.open-sub-list {
    span {
      &:after {
        transform: rotate(180deg);
        position: relative;
        top: 2px;
      }
    }
  }

  a,
  span {
    display: inline-block;
    border-left: solid 4px transparent;
    padding: 1.25rem 1rem;
    padding-left: calc(1rem - 4px);
    width: 100%;
    &:before {
      margin-right: 1em;
      color: rgba(255, 255, 255, 0.4);
    }
    &:after {
      float: right;
      position: relative;
      top: -2px;
    }
  }
`;

export const SidebarSubList = styled.ul`
  padding: 0;
  border: none;
  max-height: 0;
  opacity: 0;
  transition: all 0.3s;

  &.visible {
    max-height: 200px;
    opacity: 1;

    li {
      &:hover {
        color: #8cd7f8;
      }
    }
  }

  li {
    border: none;
    font-size: 11px;
    color: #fff;

    a {
      padding: 1.25rem 2rem;
    }
  }
`;
