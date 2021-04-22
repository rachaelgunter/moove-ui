import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import TermsProvider from '../TermsProvider';
import Selector from '../Selector/Selector';
import {
  EMAIL_ERROR_TEXT,
  PASSWORD_ERROR_TEXT,
  PASSWORD_CONFIRMATION_ERROR_TEXT,
  BUSINESS_VERTICALS,
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
  const [businessVertical, setBusinessVertical] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState(''); // TODO to rename
  const [serverSideError, setServerSideError] = useState('');
  const { termsAccepted } = useContext(TermsProvider);

  const history = useHistory();

  const [disableSubmit, setDisableSubmit] = useState(true);
  const { webAuth } = useContext(WebAuthProvider);

  useEffect(() => {
    const formIsValid =
      fullName !== '' &&
      isValidEmail(email) &&
      isValidPassword(password) &&
      repeatedPassword === password &&
      termsAccepted &&
      businessVertical !== '';

    setDisableSubmit(!formIsValid);
  }, [
    fullName,
    email,
    password,
    repeatedPassword,
    businessVertical,
    termsAccepted,
  ]);

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

  const onBusinessVerticalChange = (newValue: string) => {
    setBusinessVertical(newValue);
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
        userMetadata: {
          businessVertical,
        },
      },
      (err) => {
        if (err) {
          setServerSideError(SIGN_UP_ERROR);
        } else {
          history.push('/verification');
        }
        setDisableSubmit(false);
        setFullName('');
        setEmail('');
        setPassword('');
        setRepeatedPassword('');
        setBusinessVertical('');
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
        <Selector
          label="Business vertical"
          value={businessVertical}
          valueChange={onBusinessVerticalChange}
        >
          {BUSINESS_VERTICALS.map((vertical) => (
            <MenuItem key={vertical} value={vertical}>
              {vertical}
            </MenuItem>
          ))}
        </Selector>
        <SubmitButton onClick={onSubmit} disabled={disableSubmit}>
          {submitButtonTitle}
        </SubmitButton>
      </form>
      <ServerSideError serverSideErrorText={serverSideError} />
    </>
  );
};

export default SignUpForm;
