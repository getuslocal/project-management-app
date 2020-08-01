import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../../assets/crown.svg';
import LoginForm from '../components/Login/Login';

import {
  LandingContainer,
  LandingLeftContent,
  LandingRightContent,
  LogoContainer,
} from './Landingpage.style';

const Landing = () => {
  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <LandingContainer>
      <LandingLeftContent>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <LoginForm />
        {/* <RegisterForm /> */}
        {/* <OptionsContainer>
      </OptionsContainer> */}
      </LandingLeftContent>
      <LandingRightContent>

      </LandingRightContent>
    </LandingContainer>
  );
};

// Landingpage.propTypes = {
//   isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

export default Landing;
