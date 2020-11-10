import styled, { css } from 'styled-components';

export const Container = styled.div`
  /* min-height: 140px; */
`

export const Task = styled.div`
  padding: 6px;
  text-align: left;
  font-weight: 400;
  height:30px;
  margin: 3px 0;
  margin-right: -2px;
  position: relative;

  &:hover {
    cursor: ${({isGhost}) => isGhost ? 'auto' : 'pointer'};
  }

  ${(props) => props.isStartDate && css`
    border-left: 7px solid ${props.borderColor};
    margin-left: 5px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  `}

  ${(props) => props.isEndDate && css`
    margin-right: 5px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    border-right: 7px solid ${props.borderColor};
  `}


`