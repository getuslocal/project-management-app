import React from 'react';
import {
  Container,
  Label,
} from './Description.style';
import TextareaAutosize from 'react-textarea-autosize';

const Description = ({ currentValue, handleChange, ...props }) => (
  <Container>
    <Label>Description</Label>
    <TextareaAutosize
      name="description"
      minRows={1}
      maxRows={15}
      value={currentValue}
      onChange={handleChange} 
      />
  </Container>
)

export default Description;