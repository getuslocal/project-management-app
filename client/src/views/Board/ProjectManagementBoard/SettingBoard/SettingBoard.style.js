import styled, { css } from 'styled-components'
import { color } from '../../../../shared/utils/styles'

export const Container = styled.div`
  position:relative;
  height: 100%;
  padding: 0 5px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 22px;
`;


export const TableData = styled.td`
  padding: 16px 24px;
  font-weight:500;
  font-size: 13.5px;
  color: ${color.textDark};
  
  & > i {

    &.project-icon {
      margin-right: 10px;
      &:before {
        border-radius: 3px;
      }
    }
    &.user-icon {
      margin-right: 10px;
    }
    &.trash-icon{
      cursor: pointer;
    }
  }

  .project-name {
    color: ${color.blue};
  }
`;
