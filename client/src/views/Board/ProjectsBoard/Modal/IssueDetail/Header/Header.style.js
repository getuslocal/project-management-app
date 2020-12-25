import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 30px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;
export const Left = styled.div`
  font-weight: 500;
  display: flex;
  align-content: center;
`;

export const Right = styled.div`
  i {
    cursor: pointer;
    color: rgb(66, 82, 110);
    &:not(:last-child) {
      margin-right: 25px;
    }
  }
`;

export const Slash = styled.span`
  color: rgb(94, 108, 132);
  font-size: 12px;
`;

export const Key = styled.span`
  font-size: 14px;
  color: rgb(94, 108, 132);
  line-height: 1;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
  &:before {
    margin-right: 1em;
    position: relative;
    top: -1.5px;
  }
`;
