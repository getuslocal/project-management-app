import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../../assets/logo.svg';
import LoginForm from '../components/Login/Login';
import SignupForm from '../components/Signup/Signup';

import {
  LandingContainer,
  LandingLeftContent,
  LandingRightContent,
  LogoContainer,
  LandingMainHeading,
  LandingSubHeading,
  OptionsContainer,
} from './Landingpage.style';
import { Margin } from '../../shared/utils/global';
import CustomLinkButton from '../../shared/components/Button/CustomLinkButton/CustomLinkButton';

const Landing = () => {
  const [isActive, setisActive] = useState('login')

  return (
    <LandingContainer>

      <LandingLeftContent>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        {
          isActive !== 'signup' ?
            <LoginForm />
            :
            <SignupForm />
        }
        <OptionsContainer>
          <CustomLinkButton 
            iconType="user" 
            text="Log in" 
            className={`w-50 ${isActive === 'login' ? 'active' : ''}`}
            onClick={()=> setisActive('login')} 
          />
          <CustomLinkButton 
            iconType="unlock" 
            text="Sign up" 
            className={`w-50 ${isActive === 'signup' ? 'active' : ''}`} 
            onClick={()=> setisActive('signup')} 
          />
        </OptionsContainer>
      </LandingLeftContent>

      <LandingRightContent>
        <Margin bottom={0.5}>
          <LandingMainHeading>
            Simplify management.
        </LandingMainHeading>
        </Margin>
        <LandingSubHeading>
          Easier and faster
        </LandingSubHeading>
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
