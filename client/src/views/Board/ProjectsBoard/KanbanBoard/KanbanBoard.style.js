import styled from 'styled-components';
import { color } from '../../../../shared/utils/styles';

export const Container = styled.div`
  height: 100%;
  max-height: 100%;
  overflow: auto;
`;

export const BoardContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  padding-bottom: 20px;
  width: fit-content;
  width: -moz-fit-content;
  width: -webkit-fit-content;
`;

export const NewColumnWrapper = styled.div`
  margin: 0 5px;
  padding-right: 10px;
`;

export const NewColumnButton = styled.button`
  background-color: ${color.lightGray};
  min-height: 42px;
  height: 42px;
  min-width: 42px;
  width: 42px;
  border-radius: 6px;
  position: sticky;
  top: 0;

  &:hover {
    background-color: ${color.backgroundLight};
  }

  & > i {
    color: ${color.textDark};
  }
`;
