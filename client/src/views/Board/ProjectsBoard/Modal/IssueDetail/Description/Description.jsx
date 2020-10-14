import React, { Fragment, useState } from 'react';
import {
  Container,
  Label,
  ButtonsContainer
} from './Description.style';
import TextEdittedContent from '../../../../../../shared/components/TextEdittedContent/TextEdittedContent';
import TextEditor from '../../../../../../shared/components/TextEditor/TextEditor';
import { Hover } from '../../../../../../shared/utils/global';
import { color } from '../../../../../../shared/utils/styles';
import Button from '../../../../../../shared/components/Button/Button'

const Description = ({ currentValue, updateTicketField, updateTicketHistory }) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [description, setDescription] = useState(currentValue);
  return (
    <Container>
      <Label>Description</Label>
      {
        isEditorOpen ?
          <Fragment>
            <TextEditor value={description} onChange={(text) => setDescription(text)} />
            <ButtonsContainer>
              <Button text="Save" variant="primary" type="button" onClick={() => {
                updateTicketField({ field: 'description', value: description })
                setIsEditorOpen(false)
                updateTicketHistory('Description', null, null)
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