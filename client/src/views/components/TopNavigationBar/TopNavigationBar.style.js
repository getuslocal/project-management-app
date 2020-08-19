import styled from 'styled-components'

export const TopNavigationSmallContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: .5em;
`
export const Organization = styled.div`
      color: #8993a4;
      margin-right: 3em;

      p {
        font-size: .9em;

        span {
          margin-left: .25em;
          font-size: 1rem;
          color: #172b4d;
          font-weight: 500;
        }
      }
`
export const QuestionButton = styled.div`
      font-size: 1.2em;
      color: #8CD7F8;

      &:hover {
        cursor: pointer;
      }
`
export const TopNavigationMain = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2em;
`
export const BoardTitleContainer = styled.div`
      display: flex;
      align-items: center;
`
export const BoardTitle = styled.h1`
        margin-right: 2rem;

`
export const ArrowNavigation = styled.div`
        padding-right: 2em;
        margin-right: 2em;
        border-right: 1px solid #dfe1e6;

        i {
          font-size: 1.25em;

          &:not(:last-child) {
            margin-right: 1.5em;
          }

          &:hover {
            cursor: pointer;
          }
        }
`
export const SearchBox = styled.div`

i {
  font-size: 1.1em;
  vertical-align: middle;
  margin-right: 10px;
}

input {
  border: none;
  min-width: 400px;
  background-color: transparent;

  &::-webkit-input-placeholder {
    /* Edge */
    color: #8993a4;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #8993a4;
  }

  &::placeholder {
    color: #8993a4;
  }
}
`

export const TopNavigationTabs = styled.ul`
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
      padding-bottom: 1em;
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
`

