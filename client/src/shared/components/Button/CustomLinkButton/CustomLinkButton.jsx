import React from 'react';
import {
  LinkButtonContainer,
  CustomLink,
} from '../StyledButton.style';

const CustomLinkButton = ({ iconType, text, dest, ...props }) => (
  <LinkButtonContainer {...props}>
      <CustomLink className={`icon-${iconType}`} to={dest}>{text}</CustomLink>
  </LinkButtonContainer>
);

export default CustomLinkButton;