import React from 'react';
import {
  LinkButtonContainer,
  CustomLink,
} from '../StyledButton.style';

const CustomLinkButton = ({ iconType, text, to, ...props }) => (
  <LinkButtonContainer {...props}>
      <CustomLink className={`icon-${iconType}`} to={to}>{text}</CustomLink>
  </LinkButtonContainer>
);

export default CustomLinkButton;