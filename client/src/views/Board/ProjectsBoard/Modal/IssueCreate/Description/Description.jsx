import React from 'react'
import TextEditor from '../../../../../../shared/components/TextEditor/TextEditor';
import {
  Container,
  Label,
} from './Description.style';

const Description = ({
  value,
  onChange
}) => {
  return (
    <Container>
      <Label>Description</Label>
      <TextEditor
        value={value}
        onChange={onChange}
        minHeight={200}
      />
    </Container>
  )
}

export default Description;