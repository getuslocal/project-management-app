import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 12px;
  color: rgb(23, 43, 77);
  margin: 4px 0px;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: rgb(76, 154, 255) 0px 0px 0px 2px inset;
`;

export const TextArea = styled.textarea`
  margin-bottom: 8px;
  font-size: 14px;
  border: none;
  width: 100%;
  min-height: 4em;
`;
export const DropDownMenu = styled.div`
  display: inline-block;
  position: relative;
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
export const DropDownContent = styled.div``;

export const ButtonContainer = styled.div`
  float: right;
`;
export const Button = styled.input`
  border: none;
  background-color: transparent;
  font-size: 12px;
  padding: 0.4em;
  font-weight: 500;
  border-radius: 3px;
  color: rgb(0, 82, 204);
  margin-right: 0.75em;

  &:hover {
    opacity: 0.9;
    background-color: rgba(9, 30, 66, 0.08);
    cursor: pointer;
  }
`;
export const CloseButton = styled.span`
  font-size: 12px;
  padding: 0.25em 0.4em;
  font-weight: 500;
  border-radius: 3px;
  color: rgb(94, 108, 132);

  &:hover {
    cursor: pointer;
    background-color: rgba(9, 30, 66, 0.08);
  }
`;
export const AngleDownIcon = styled.span`
  margin-left: 10px;
`;
export const IconCont = styled.span`
  margin-right: 10px;
`;
