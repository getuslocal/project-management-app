import styled, { css }  from 'styled-components'

const issueStatusTheme = css`
  min-width: 220px;
  li{
    font-size: 12px;
    span {
      color: rgb(7, 71, 166);
      padding: 1px 5px;
      border-radius: 5px;
      font-weight: 700;
      background-color: rgb(222, 235, 255);
    }
    padding: .85rem .75rem;
    &:hover{
      background-color: rgb(222, 235, 255);
    }
  }
`;

export const Container = styled.div`
  margin-top: 5px;
  box-shadow: 0 4px 8px -2px rgba(9, 30, 66, .25), 0 0 1px rgba(9, 30, 66, .31);
  background-color: #fff;
  border-radius: 3px;
  padding: .5em 0;
  position: absolute;
  z-index: 999;
  width: 100%;
  
  &.theme-issueStatus {
    ${issueStatusTheme}
  }
`

export const MainContent = styled.div`
    &:not(:last-child) {
      margin-bottom: 1.25em;
    }

    p {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: .5rem;
      padding: 0 .5em;
    }
`
export const ListItem = styled.li`
  font-size: 14px;
  padding: .85rem .75rem;

  &:hover {
    cursor: pointer;
    background-color: rgba(9, 30, 66, 0.05);
  }

  &:before {
    margin-right: .4rem;
    vertical-align: middle;
  }
`
