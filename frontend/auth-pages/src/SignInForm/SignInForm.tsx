import React, { FC, useContext, useEffect, useState } from 'react';
import ServerSideError from '../ServerSideError/ServerSideError';
import { EMAIL_ERROR_TEXT } from '../constants';

import SubmitButton from '../SubmitButton';
import TextField, { TextFieldType } from '../TextField';
import WebAuthProvider from '../WebAuthProvider';
import isValidEmail from './utils';

export const submitButtonTitle = 'SIGN IN';

const SIGN_IN_ERROR = 'Wrong email or password';

const SignInForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [serverSideError, setServerSideError] = useState('');
  const { webAuth, options } = useContext(WebAuthProvider);

  useEffect(() => {
    const formIsValid = isValidEmail(email) && password !== '';

    setDisableSubmit(!formIsValid);
  }, [email, password]);

  const onEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const onPasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  const onSubmit = () => {
    const formValue = {
      email,
      password,
    };
    setDisableSubmit(true);

    webAuth.login(
      {
        username: email,
        password,
        realm: 'Username-Password-Authentication',
        audience: options.audience,
      },
      (err) => {
        if (err) {
          setServerSideError(err.description || SIGN_IN_ERROR);
        }
        setDisableSubmit(false);
        setEmail('');
        setPassword('');
      },
    );

    return formValue;
  };

  return (
    <>
      <form noValidate data-testid="signIn-form">
        <TextField
          type={TextFieldType.EMAIL}
          label="Email"
          value={email}
          onChange={onEmailChange}
          error={email !== '' && !isValidEmail(email)}
          errorText={EMAIL_ERROR_TEXT}
        />
        <TextField
          type={TextFieldType.PASSWORD}
          label="Password"
          value={password}
          onChange={onPasswordChange}
        />
        <SubmitButton onClick={onSubmit} disabled={disableSubmit}>
          {submitButtonTitle}
        </SubmitButton>
      </form>
      <ServerSideError serverSideErrorText={serverSideError} />
    </>
  );
};

export default SignInForm;
