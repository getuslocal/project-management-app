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
} from './Signup.style';

const SignupForm = () => {
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password } = userCredentials;

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };
    return (
        <LoginContainer>
            <FormTitle>
                Sign up <GrayText>for your account</GrayText>
            </FormTitle>
            <form>
                <Margin bottom={3} >
                    <FormInput
                        type='text'
                        name='name'
                        label='Name'
                        iconType="user"
                        value={name}
                        handleChange={handleChange}
                        required
                    />
                </Margin>
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
                        value='Sign up now'
                    />
                </Margin>
                <FormSmallText>Try right now ? <LinkText to="/">Use guest login</LinkText></FormSmallText>
            </form>
        </LoginContainer>
    );
};

export default SignupForm;