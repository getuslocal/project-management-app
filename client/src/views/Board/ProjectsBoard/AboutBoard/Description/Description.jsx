import React, { Fragment, useState } from 'react';
import {
  Container,
  Label,
} from './Description.style';
import TextEdittedContent from '../../../../../shared/components/TextEdittedContent/TextEdittedContent';
import TextEditor from '../../../../../shared/components/TextEditor/TextEditor';
import { Hover } from '../../../../../shared/utils/global';
import { color } from '../../../../../shared/utils/styles';

const Description = ({ currentValue, onChange, isEditorOpen, setIsEditorOpen }) => {
  return (
    <Container>
      <Label>Description</Label>
      {
        isEditorOpen ?
          <TextEditor value={currentValue} onChange={onChange} />
          :
          <Hover bgColor={color.hoverGray} borderRadius={3} >
            <TextEdittedContent content={currentValue} onClick={() => setIsEditorOpen(true)} />
          </Hover>
      }
    </Container>
  )
}

export default Description;