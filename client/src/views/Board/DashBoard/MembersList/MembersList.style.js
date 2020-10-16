import styled, { css } from 'styled-components'
import { color } from '../../../../shared/utils/styles'

export const Container = styled.div`
  position:relative;
  height: 100%;
  padding: 0 5px 5px;
`;

export const Table = styled.table`
background-color: #fff;
/* border-collapse: collapse; */
margin: 0;
word-wrap: break-word;
`;

export const Head = styled.thead`
  color: #6c798f;
  display:table;
  table-layout:fixed;/* even columns width , fix width of table too*/
  /* @todo: Figure out how to add this when has scroll bar. */
  width: calc( 100% - 1em ); 
  width: 100%;
`;

export const Body = styled.tbody`
  /* max-height: 280px; */
  /* overflow:auto; */
  /* display: block; */
`;

export const BodyTableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(211, 212, 213, .36);
  }
  width: 100%;
  /* padding: 5px; */
  display:table;
  table-layout:fixed;
`;

export const TableHeader = styled.th`
  color: ${color.textLight};
  font-size: 14.5px;
  font-weight: 500;
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
  font-size: 14px;
  font-weight: 500;
  color: ${color.textDark};
  
  & > i {
    color: ${color.textVeryLight2};
    margin-right: 10px;
  }
`;
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;

  & > i {
    margin-right: 10px;
  }
`;
export const Count = styled.p`
  font-size: 13.5px;
  font-weight: 500;
  color: ${color.textMedium};
  position: absolute;
  bottom: 0;
  right: 0;
`;