import React, { Fragment, useState } from 'react';
import {
  Container,
  Label,
  ButtonsContainer
} from './Description.style';
import TextEdittedContent from '../../../../../../../shared/components/TextEdittedContent/TextEdittedContent';
import TextEditor from '../../../../../../../shared/components/TextEditor/TextEditor';
import { Hover } from '../../../../../../../shared/utils/global';
import { color } from '../../../../../../../shared/utils/styles';
import Button from '../../../../../../../shared/components/Button/Button'

const Description = ({ currentValue, handleEditorText, saveDescription }) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  return (
    <Container>
      <Label>Description</Label>
      {
        isEditorOpen ?
          <Fragment>
            <TextEditor value={currentValue} onChange={handleEditorText} />
            <ButtonsContainer>
              <Button text="Save" variant="primary" type="button" onClick={() => {
                saveDescription()
                setIsEditorOpen(false)
              }} />
              <Button text="Cancel" variant="text" type="button" onClick={() => setIsEditorOpen(false)} />
            </ButtonsContainer>
          </Fragment>
          :
          <Hover bgColor={color.hoverGray} borderRadius={3} >
            <TextEdittedContent content={currentValue} onClick={() => setIsEditorOpen(true)} />
          </Hover>
      }
    </Container>
  )
}

export default Description;