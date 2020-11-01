import styled, { css } from 'styled-components'
import { color } from '../../../../shared/utils/styles'

export const Container = styled.div`
  position:relative;
  height: 100%;
  padding: 0 5px 5px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 22px;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 800px;
  overflow-x: scroll;
  border-collapse: collapse;
  margin: 0;
  border: 1px solid ${color.borderLightest};
  word-wrap: break-word;
`;

export const BodyRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(211, 212, 213, .36);
  }
`;

export const TableHeader = styled.th`
  background-color: #f5f8fa;
  color: ${color.textDarkest};
  font-size: 12px;
  line-height: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: left;
  padding-left: 7px;
  min-width: ${(props) => props.width ? `${props.width}` : 'auto'};
  border-bottom: 3px solid #eaf0f6;

  font-weight: 500;
    font-size: 12px;
    background-color: #f5f8fa;
    text-align: left;
    text-transform: uppercase;
    padding: 10px 24px;
`;

export const TableData = styled.td`
  padding: 16px 24px;
  font-weight:500;
  font-size: 13.5px;
  color: ${color.textDark};
  
  & > i {
    color: ${color.textLight};
    vertical-align: middle;
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