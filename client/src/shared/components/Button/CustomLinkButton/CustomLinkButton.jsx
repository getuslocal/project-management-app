import React from 'react';
import { Container, CustomLink } from './CustomLinkButton.style';

const CustomLinkButton = ({ iconType, text, to, ...props }) => (
  <Container {...props}>
    <CustomLink className={`icon-${iconType}`} to={to}>
      {text}
    </CustomLink>
  </Container>
);

export default CustomLinkButton;
