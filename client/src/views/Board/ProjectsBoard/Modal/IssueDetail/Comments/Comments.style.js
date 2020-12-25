import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.div`
  margin: 20px 0;
`;

export const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 1.25em;
`;

export const Top = styled.div`
  display: flex;
`;

export const TextAreaWrapper = styled.div`
  width: 100%;
`;

export const Textarea = styled(TextareaAutosize)`
  overflow: hidden;
  width: 100%;
  resize: none;
  line-height: 1.28;
  padding: 0.75rem 0.5rem;
  border-radius: 3px;
  font-size: 13px;
  border: 1px solid #dfe1e6;

  &:hover {
    background-color: #091e420d;
  }

  &:focus {
    outline: none;
    border: 1px solid rgb(76, 154, 255);
    box-shadow: rgb(76, 154, 255) 0px 0px 0px 1px;
    background-color: #fff;
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 5px;
  & > button {
    margin-right: 6px;
  }
`;

export const Delete = styled.span`
  cursor: pointer;
  padding: 2px 0px;
`;
