import styled, { css } from 'styled-components'

export const CompleteButton = styled.button`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 8px;
  border: 1px solid #5e6c84;
  color: #5e6c84;
  border-radius: 3px;

  &::before {
    font-size: 11px;
    margin-right: 5px;
  }

  &:hover {
    ${({isEpicDone}) => !isEpicDone && css`
      background-color: #091e420d;
    `}
  }

  ${({isEpicDone}) => isEpicDone && css`
    background-color: rgb(227,252,239);
    color: rgb(0,102,68) !important;
    border-color: transparent; 
    &:hover {
      background-color: rgb(227,252,239);
    }
  `}
`
