import React from 'react';
import {
  Container,
  InnerContainer,
  Heading,
  Description,
  Image
} from './NotFound.style';
import Button from '../../shared/components/Button/Button';
import { withRouter } from 'react-router-dom';
import AccessDeniedLogo from '../../assets/not-found.svg';

const NotFound = ({ ...props }) => {
  return (
    <Container>
      <InnerContainer>
        <Heading>Page Not Found</Heading>
        <Description>Sorry, this page does not exist. You may have lost access to this page. Contact your administrator to get access.</Description>
        <div><Button text="Back to Home" variant="primary" onClick={() => props.history.push("/app/dashboard")} /></div>
        <Image src={AccessDeniedLogo} alt="" />
      </InnerContainer>
    </Container>
  );
};

export default withRouter(NotFound);
