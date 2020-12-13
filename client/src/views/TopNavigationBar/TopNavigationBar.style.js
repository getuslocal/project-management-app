import styled from 'styled-components'
import { color } from '../../shared/utils/styles'

export const Container = styled.div`
  padding-top: 30px;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`

export const BoardTitle = styled.h1`
`

export const SearchBox = styled.div`
  margin-left: auto;
  position: relative;

  & > i {
    color: ${color.textDark};
    position: absolute;
    left: 14px;
    top: 13px;
  }

  input {
    border: none;
    border: 1px solid rgba(0, 0, 0, .15);
    padding: 9px 9px 9px 36px;
    border-radius: 20px;
    color: ${color.textDarkest};
    font-size: 14px;
    width: 350px;
    background-color: transparent;
    transition: all .2s;

    &::-webkit-input-placeholder {
      /* Edge */
      color: ${color.textMedium};
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${color.textMedium};
    }

    &::placeholder {
      color: ${color.textMedium};
    }

    &:focus{
      outline: none;
      border-color: ${color.borderInputFocus};
      box-shadow: ${color.borderInputFocus} 0px 0px 0px 1px;
      width: 450px;
    }
  }
`

export const Tabs = styled.ul`
  &:after {
    z-index: -1;
    content: '';
    display: block;
    border-bottom: 2px solid #f0f0f0;
    position: relative;
    top: -1px;
  }
`

export const Tab = styled.li`
  border-bottom: 3px solid transparent;
  display: inline-block;

  &:not(:last-child) {
    margin-right: 3em;
  }

  &:hover,
  &.active {
    border-bottom-color: #0f35a9;
    cursor: pointer;
  }

  a{
    padding-bottom: 1em;
    min-width: 50px;
    text-align: center;
    display: inline-block;
  }
`

