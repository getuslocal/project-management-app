import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Placeholder,
} from './TextEdittedContent.style';

const TextEdittedContent = ({ content, ...props }) => {
  return (
    <Container className="ql-snow">
      {
        !content.length > 0 || content === "<p><br></p>" ?
          <Placeholder {...props}>Add a description...</Placeholder>
          :
          <Content className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} {...props} />
      }
    </Container>
  )
}
TextEdittedContent.propTypes = {
  content: PropTypes.string.isRequired
};

export default TextEdittedContent;