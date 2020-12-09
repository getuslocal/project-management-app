import React, { useState } from 'react';
import { connect } from 'react-redux';
import LoginForm from './Login/Login';
import SignupForm from './Signup/Signup';
import store from '../../redux/store';
import { refreshErrorMessage } from '../../redux/auth/auth.actions'
import Icon from '../../shared/components/Icon/Icon'
import {
  Container,
  Left,
  Right,
  Headings,
  Logo,
  FormContainer,
  MainHeading,
  SubHeading,
  Options,
  Image,
  Bottom
} from './Landing.style';
import CustomLinkButton from '../../shared/components/Button/CustomLinkButton/CustomLinkButton';

const Landing = ({ errorMessage }) => {
  const [isActive, setisActive] = useState('login')
  return (
    <Container>
      <Left>
        <FormContainer>
          <Logo>
            <Icon type="cube" size={50} isSolid={true} />
            <span>Simplanner</span>
          </Logo>
          {
            isActive !== 'signup' ?
              <LoginForm />
              :
              <SignupForm />
          }
        </FormContainer>
        <Options>
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
        </Options>
      </Left>
      <Right>
        <Image />
        <Bottom>
          <Headings>
            <MainHeading>Powerful and Easy to Use<br />Project Management Tool</MainHeading>
            <SubHeading> See how you can simplify your project management. Takes just two minutes to sign in.</SubHeading>
          </Headings>
        </Bottom>
      </Right>
    </Container>
  );
};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps)(Landing);
