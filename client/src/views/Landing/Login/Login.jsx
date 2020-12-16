import React, { useState } from 'react';
import IconInput from '../../../shared/components/Form/IconInput/IconInput';
import { Margin } from '../../../shared/utils/global';
import { login } from '../../../redux/auth/auth.actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorMessage from '../../../shared/components/ErrorMessage/ErrorMessage';
import { SubmitButton } from '../Landing.style';
import {
  FormTitle,
  GrayText,
  LoginContainer,
} from './Login.style';

const LoginForm = ({ login, errorMessage }) => {
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

  return (
    <LoginContainer>
      <FormTitle>
        Log in <GrayText>to your account</GrayText>
      </FormTitle>
      {errorMessage ?
        <Margin bottom={40} >
          <ErrorMessage errorMessage={errorMessage} />
        </Margin> : ''}
      <form onSubmit={handleSubmit}>
        <Margin bottom={40} >
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
        <Margin bottom={40} >
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
        <Margin bottom={30} >
          <SubmitButton name='button' type='submit' value='Login now' />
        </Margin>
      </form>
    </LoginContainer>
  );
};

LoginForm.propTypes = {
  errorMessage: PropTypes.string
};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage
});

export default connect(mapStateToProps, { login })(LoginForm);
