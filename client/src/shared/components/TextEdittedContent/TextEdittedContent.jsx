import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Placeholder,
} from './TextEdittedContent.style';

const TextEdittedContent = ({ content, ...props }) => {
  console.log(content)
  return (
    <Container className="ql-snow">
      {
        content.length > 0 ?
          <Content className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} {...props} />
          :
          <Placeholder {...props}>Add a description...</Placeholder>
      }
    </Container>
  )
}
TextEdittedContent.propTypes = {
  content: PropTypes.string.isRequired
};

export default TextEdittedContent;