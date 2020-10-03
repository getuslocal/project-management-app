import React, { useState } from 'react';
import IconInput from '../../../shared/components/Form/IconInput/IconInput';
import FormCheckBox from '../../../shared/components/Form/FormCheckBox/FormCheckBox';
import FormButton from '../../../shared/components/Form/FormButton/FormButton';
import { Margin } from '../../../shared/utils/global';
import { login } from '../../../redux/auth/auth.actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorMessage  from '../../../shared/components/ErrorMessage/ErrorMessage';
import {
  FormTitle,
  GrayText,
  LoginContainer,
  FormSmallText,
  LinkText,
} from './Login.style';

const LoginForm = ({ login, isAuthenticated, errorMessage }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  }

  if (isAuthenticated) {
    return <Redirect to="/app/dashboard" />;
  }

  return (
    <LoginContainer>
      <FormTitle>
        Log in <GrayText>to your account</GrayText>
      </FormTitle>
      {errorMessage ?
        <Margin bottom={2} >
          <ErrorMessage errorMessage={errorMessage}/>
        </Margin> : ''}
      <form onSubmit={handleSubmit}>
        <Margin bottom={3} >
          <IconInput
            name='email'
            type='email'
            label='Email'
            iconType="envelope-open"
            value={email}
            handleChange={handleChange}
            required
          />
        </Margin>
        <Margin bottom={3} >
          <IconInput
            name='password'
            type='password'
            label='Password'
            iconType="lock"
            value={password}
            handleChange={handleChange}
            required
          />
        </Margin>
        <Margin bottom={4} >
          <FormCheckBox
            name='checkbox'
            type='checkbox'
          />
        </Margin>
        <Margin bottom={2} >
          <FormButton
            name='button'
            type='submit'
            value='Login now'
          />
        </Margin>
        <FormSmallText>Try a demo version ? <LinkText to="/">Use guest login</LinkText></FormSmallText>
      </form>
    </LoginContainer>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errorMessage: state.auth.errorMessage
});

export default connect(mapStateToProps, { login })(LoginForm);
