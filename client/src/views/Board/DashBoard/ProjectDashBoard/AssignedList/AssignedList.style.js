import styled, { css } from 'styled-components'
import { color } from '../../../../../shared/utils/styles';

export const Container = styled.div`
  position:relative;
  height: 100%;
`;

export const Table = styled.table`
  background-color: #fff;
  margin: 0;
  word-wrap: break-word;
`;

export const Head = styled.thead`
  border-bottom: 2px solid #dfe1e6;
  color: #6c798f;
  display:table;
  table-layout:fixed;/* even columns width , fix width of table too*/
  /* @todo: Figure out how to add this when has scroll bar. */
  width: calc( 100% - 1em ); 
  width: 100%;
`;

export const Body = styled.tbody`
  max-height: 340px;
  overflow:auto;
  display: block;
`;
export const BodyTableRow = styled.tr`
  border-bottom: 1px solid #dfe1e6;
  width: 100%;
  display:table;
  table-layout:fixed;

  &.no-results-row {
    border-bottom: none;

    & > td {
      text-align: center;
      display: block;
    }
  }
  
  &:not(.no-results-row) {
    &:hover{
      background-color: ${color.backgroundLightest};
      cursor: pointer;
    }
  }
`;

export const TableHeader = styled.th`
  color: #5e6c84;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: left;
  padding-left: 7px;
  width: ${(props) => props.width ? `${props.width}px` : 'auto'};
`;

export const TableData = styled.td`
  padding: 10px 7px;
  width: ${(props) => props.width ? `${props.width}px` : 'auto'};
  font-size: 13.5px;
  font-weight: 500;
`;
