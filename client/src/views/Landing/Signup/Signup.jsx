import React, { useState, useEffect } from 'react';
import FormInput from '../../../shared/components/Form/IconInput/IconInput';
import { Margin } from '../../../shared/utils/global';
import { register } from '../../../redux/auth/auth.actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorMessage from '../../../shared/components/ErrorMessage/ErrorMessage';
import { SubmitButton } from '../Landing.style';
import { FormTitle, GrayText, LoginContainer } from './Signup.style';

const SignupForm = ({ register, errorMessage, ...props }) => {
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordsUnMatch, setPasswordsUnMatch] = useState(false);

  const { name, email, password, confirmPassword } = userCredentials;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsUnMatch(true);
      return;
    } else if (passwordsUnMatch) {
      setPasswordsUnMatch(false);
    }

    register({ name, email, password });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <LoginContainer>
      <FormTitle>
        Sign up <GrayText>for your account</GrayText>
      </FormTitle>
      {(errorMessage || passwordsUnMatch) && (
        <Margin bottom={40}>
          <ErrorMessage
            errorMessage={
              passwordsUnMatch ? 'Passwords do not match' : errorMessage
            }
          />
        </Margin>
      )}
      <form onSubmit={handleSubmit}>
        <Margin bottom={40}>
          <FormInput
            type="text"
            name="name"
            label="Name"
            iconType="user"
            value={name}
            handleChange={handleChange}
            required
          />
        </Margin>
        <Margin bottom={40}>
          <FormInput
            type="email"
            name="email"
            label="Email"
            iconType="envelope-open"
            value={email}
            handleChange={handleChange}
            required
          />
        </Margin>
        <Margin bottom={40}>
          <FormInput
            type="password"
            name="password"
            label="Password"
            iconType="lock"
            value={password}
            handleChange={handleChange}
            required
          />
        </Margin>
        <Margin bottom={40}>
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm password"
            iconType="lock"
            value={confirmPassword}
            handleChange={handleChange}
            required
          />
        </Margin>
        <Margin bottom={30}>
          <SubmitButton name="button" type="submit" value="Sign up now" />
        </Margin>
      </form>
    </LoginContainer>
  );
};

SignupForm.propTypes = {
  register: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps, { register })(SignupForm);
