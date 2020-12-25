import React, { useState } from 'react';
import { Container } from './Title.style';
import TextareaAutosize from 'react-textarea-autosize';

const Title = ({
  currentValue,
  updateTicketField,
  updateTicketHistory,
  ...props
}) => {
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [summary, setSummary] = useState(currentValue);

  const handleChange = (event) => {
    const { value } = event.target;
    setSummary(value);
    // Clear timeout throughout the typing.
    clearTimeout(typingTimeout);
    // Set a timeout to run after typing ends.
    const typingTimer = setTimeout(function () {
      // Update summary field 1000ms after stops typing.
      updateTicketField({ field: 'summary', value: value });
      updateTicketHistory('Summary', null, null);
    }, 1000);
    setTypingTimeout(typingTimer);
  };

  return (
    <Container>
      <TextareaAutosize
        minRows={1}
        maxRows={6}
        name="summary"
        value={summary}
        placeholder="Add a summary..."
        onChange={handleChange}
        required
        {...props}
      />
    </Container>
  );
};

export default Title;
