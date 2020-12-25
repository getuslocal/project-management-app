import styled, { css } from 'styled-components';

export const ListContainer = styled.ul`
  padding: 5px 10px;
  border: 1px solid #dfe1e6;
  font-weight: 400;
  border-radius: 3px;
  background-color: rgb(250, 251, 252);
  min-height: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
    background-color: #091e420d;
  }
`;

export const List = styled.li`
  font-size: 12px;
  padding: 3px 0;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const AddButton = styled.button`
  padding: 5px;
  font-size: 12px;
  color: rgb(137, 147, 164);
  font-weight: 600;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    background-color: rgba(9, 30, 66, 0.08);
  }
`;

export const Close = styled.span`
  margin-right: 8px;
  height: 14px;
  line-height: 14px;
  min-width: 8px;
  max-width: 8px;
  width: 8px;

  &:hover {
    cursor: pointer;
  }
`;
export const SelectItem = styled.div`
  font-size: 12px;
  width: 100%;
  color: #172b4d;
  font-style: normal;
  font-weight: 400;
  display: flex;

  & > i {
    margin-right: 7px;
  }
`;

export const IconCont = styled.span`
  margin-right: 5px;
`;

export const Key = styled.span`
  color: rgb(137, 147, 164);
  margin-right: 5px;
  font-weight: 600;
  white-space: nowrap;
`;

export const Summary = styled.span``;

export const LinkedEpic = styled.p`
  border-radius: 3px;
  display: inline-block;
  margin-left: auto;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  padding: 2px 4px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Left = styled.div`
  margin-right: 10px;
`;
export const Right = styled.div`
  width: 100%;
`;
export const RightTop = styled.div``;

export const RightBottom = styled.div`
  margin-top: 4px;
`;
