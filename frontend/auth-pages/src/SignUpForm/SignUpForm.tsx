import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  EMAIL_ERROR_TEXT,
  PASSWORD_ERROR_TEXT,
  PASSWORD_CONFIRMATION_ERROR_TEXT,
} from '../constants';
import TextField, { TextFieldType } from '../TextField';
import { isValidEmail, isValidPassword } from '../utils';

import SubmitButton from '../SubmitButton';
import WebAuthProvider from '../WebAuthProvider';
import ServerSideError from '../ServerSideError/ServerSideError';

export const submitButtonTitle = 'SIGN UP';
const SIGN_UP_ERROR = 'Unable to sign up. User with this email already exists.';

const SignUpForm: FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState(''); // TODO to rename
  const [serverSideError, setServerSideError] = useState('');

  const history = useHistory();

  const [disableSubmit, setDisableSubmit] = useState(true);
  const { webAuth } = useContext(WebAuthProvider);

  useEffect(() => {
    const formIsValid =
      fullName !== '' &&
      isValidEmail(email) &&
      isValidPassword(password) &&
      repeatedPassword === password;

    setDisableSubmit(!formIsValid);
  }, [fullName, email, password, repeatedPassword]);

  const onFullNameChange = (newValue: string) => {
    setFullName(newValue);
  };

  const onEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const onPasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  const onRepeatedPasswordChange = (newValue: string) => {
    setRepeatedPassword(newValue);
  };

  const onSubmit = () => {
    setDisableSubmit(true);
    const formValue = {
      fullName,
      email,
      password,
      password2: repeatedPassword,
    };

    webAuth.signup(
      {
        email,
        password,
        connection: 'Username-Password-Authentication',
      },
      (err) => {
        if (err) {
          setServerSideError(SIGN_UP_ERROR);
        } else {
          history.push('/');
        }
        setDisableSubmit(false);
        setFullName('');
        setEmail('');
        setPassword('');
        setRepeatedPassword('');
      },
    );

    return formValue;
  };

  return (
    <>
      <form noValidate data-testid="signIn-form">
        <TextField
          label="Full Name"
          value={fullName}
          onChange={onFullNameChange}
        />
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
          error={password !== '' && !isValidPassword(password)}
          errorText={PASSWORD_ERROR_TEXT}
        />
        <TextField
          type={TextFieldType.PASSWORD}
          label="Repeat Password"
          value={repeatedPassword}
          onChange={onRepeatedPasswordChange}
          error={repeatedPassword !== '' && repeatedPassword !== password}
          errorText={PASSWORD_CONFIRMATION_ERROR_TEXT}
        />
        <SubmitButton onClick={onSubmit} disabled={disableSubmit}>
          {submitButtonTitle}
        </SubmitButton>
      </form>
      <ServerSideError serverSideErrorText={serverSideError} />
    </>
  );
};

export default SignUpForm;
