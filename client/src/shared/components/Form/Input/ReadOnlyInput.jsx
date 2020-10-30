import React from 'react';
import styled from 'styled-components'
import {
  FormContainer,
  Label,
  FormContent,
  Description,
} from '../Form.style';

const ReadOnlyInput = ({ label, description, renderValue, value, ...props }) => {
  return (
    <FormContainer>
      <FormContent>
        <Label>{label}</Label>
        <Content {...props}>
          {
            renderValue ? renderValue() : value
          }
        </Content>
        <Description>{description}</Description>
      </FormContent>
    </FormContainer>
  )
}

const Content = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #172b4d;
  font-style: normal;
  line-height: 20px;
  padding: 5px 8px;
  border : none;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  background-color: rgb(250, 251, 252);
  transition: all .2s;
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
`

export default ReadOnlyInput;
