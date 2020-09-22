import styled, { css } from 'styled-components';

export const Container = styled.div`
`

export const Task = styled.div`
  padding: 6px;
  position: relative;
  text-align: left;
  font-weight: 400;

  ${(props) => props.isStartDate && css`
    border-left: 3px solid ${props.borderColor};
    margin-left: 5px;
  `}

`