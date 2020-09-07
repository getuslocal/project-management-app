import React from 'react';
import {
  Container,
} from './Title.style';
import TextareaAutosize from 'react-textarea-autosize';

const Title = ({ currentValue, handleChange, ...props }) => (
  <Container>
    <TextareaAutosize
      minRows={1}
      maxRows={6}
      name="summary"
      value={currentValue}
      onChange={handleChange}
      {...props}
    />
  </Container>
)

export default Title;