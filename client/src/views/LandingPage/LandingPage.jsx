import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../../assets/logo.svg';
import LoginForm from '../components/Login/Login';
import SignupForm from '../components/Signup/Signup';
import store from '../../redux/store';
import { refreshErrorMessage } from '../../redux/auth/auth.actions'

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

const Landing = ({ errorMessage }) => {
  const [isActive, setisActive] = useState('login')
  return (
    <LandingContainer>

      <LandingLeftContent>
        <LogoContainer>
          <img src={Logo} width='60px' height='60px' />
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
            to="/"
            text="Log in"
            className={`w-50 ${isActive === 'login' ? 'active' : ''}`}
            onClick={() => {
              setisActive('login');
              if (errorMessage) store.dispatch(refreshErrorMessage());
            }}
          />
          <CustomLinkButton
            iconType="unlock"
            to="/"
            text="Sign up"
            className={`w-50 ${isActive === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setisActive('signup');
              if (errorMessage) store.dispatch(refreshErrorMessage());
            }}
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

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps)(Landing);
