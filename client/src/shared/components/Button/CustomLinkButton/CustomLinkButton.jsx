import React from 'react';
import {
  LinkButtonContainer,
  CustomLink,
} from '../Button.style';

const CustomLinkButton = ({ iconType, text, to, ...props }) => (
  <LinkButtonContainer {...props}>
      <CustomLink className={`icon-${iconType}`} to={to}>{text}</CustomLink>
  </LinkButtonContainer>
);

export default CustomLinkButton;