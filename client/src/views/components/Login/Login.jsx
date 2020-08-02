import React, { useState } from 'react';
import FormInput from '../../../shared/components/Form/FormInput/FormInput';
import FormCheckBox from '../../../shared/components/Form/FormCheckBox/FormCheckBox';
import FormButton from '../../../shared/components/Form/FormButton/FormButton';
import { Margin } from '../../../shared/utils/global';
import {
  FormTitle,
  GrayText,
  LoginContainer,
  FormSmallText,
  LinkText
} from './Login.style';

const LoginForm = () => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { email, password } = userCredentials;

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <LoginContainer>
      <FormTitle>
        Log in <GrayText>to your account</GrayText>
      </FormTitle>
      <form>
        <Margin bottom={3} >
          <FormInput
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
          <FormInput
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
            type='button'
            value='Login now'
          />
        </Margin>
        <FormSmallText>Try right now ? <LinkText to="/">Use guest login</LinkText></FormSmallText>
      </form>
    </LoginContainer>
  );
};

export default LoginForm;