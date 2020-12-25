import styled from 'styled-components';
import { color } from '../../../shared/utils/styles';

export const Container = styled.table`
  width: 100%;
  min-width: 800px;
  overflow-x: scroll;
  border-collapse: collapse;
  margin: 0;
  border: 1px solid ${color.borderLightest};
  word-wrap: break-word;
`;

export const Head = styled.thead`
  & > tr > th {
    color: ${color.textDarkest};
    line-height: 16px;
    padding-bottom: 4px;
    text-align: left;
    padding-left: 7px;
    min-width: ${(props) => (props.width ? `${props.width}` : 'auto')};
    border-bottom: 3px solid #eaf0f6;
    font-weight: 500;
    font-size: 12px;
    background-color: #f5f8fa;
    text-transform: uppercase;
    padding: 10px 24px;
  }
`;

export const Body = styled.tbody`
  & > tr {
    &:not(:last-child) {
      border-bottom: 1px solid rgba(211, 212, 213, 0.36);
    }
    /* Table body data cell */
    & > td {
      padding: 16px 24px;
      font-weight: 500;
      font-size: 14px;
      color: ${color.textDark};
    }
  }
`;
