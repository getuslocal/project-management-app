import React from 'react';
import {
    FormTitle,
    GrayText,
    LoginContainer,
} from './Login.style';
import FormInput from '../../../shared/components/FormInput/FormInput';

const LoginForm = () => {
    return (
        <LoginContainer>
            <FormTitle>
                Log in <GrayText>to your account</GrayText>
            </FormTitle>
            <form>
                <FormInput
                    name='email'
                    type='email'
                    label='email'
                    value=''
                    iconType="user"
                    required
                />
                <FormInput
                    name='password'
                    type='password'
                    label='password'
                    value=''
                    iconType="password"
                    required
                />
                {/* <CustomButton type='submit'> Sign in </CustomButton> */}
            </form>
        </LoginContainer>
    );
};

export default LoginForm;