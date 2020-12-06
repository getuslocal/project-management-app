import React from 'react';
import PropTypes from 'prop-types';
import AccessDeniedLogo from './assets/access_denied.png';
import {
  Container,
  InnerContainer,
  Heading,
  Description,
  Image
} from './AccessDenied.style';
import Button from '../../../../shared/components/Button/Button';

const AccessDenied = ({ ...props }) => {
  console.log(props)
  return (
    <Container>
      <InnerContainer>
        <Heading>You don't have permission to access this project.</Heading>
        <Description>
          Contact your administrator to get access. If you are an administrator,
          go to <em>Project Management</em> and assign yourself as a member of this project.
        </Description>
        <div><Button text="Back to Home" variant="primary" onClick={() => props.history.push("/app/dashboard")} /></div>
        <Image src={AccessDeniedLogo} alt="" />
      </InnerContainer>
    </Container>
  )
}

export default AccessDenied
