import styled, {css} from 'styled-components'

export const Container = styled.div`
  position: relative;
  height: 100%;
`;
export const UnorderedList = styled.div`
  padding: 10px;
`;

export const List = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Left = styled.div`
  margin-right: 15px;
`;

export const Center = styled.div`
`;

export const Name = styled.div`
`;

export const Title = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: rgb(94, 108, 132);
`;

export const Right = styled.div`
  font-size: 14px;
  justify-self: flex-end;
  margin-left: auto;
  color: rgb(94, 108, 132);
`;
export const Counter = styled.span`
  font-weight: 500;
  color: #172b4d;
`;
export const ResultCounter = styled.p`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
  font-weight: 500;
  color: #5e6c84;
`;
