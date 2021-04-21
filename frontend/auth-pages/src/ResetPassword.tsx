import React, { FC, useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import AuthPage from './AuthPage';
import TextField, { TextFieldType } from './TextField';
import isValidEmail from './SignInForm/utils';
import SubmitButton from './SubmitButton';
import Info from './Info';
import ServerSideError from './ServerSideError/ServerSideError';
import { isValidPassword } from './utils';
import {
  PASSWORD_ERROR_TEXT,
  PASSWORD_CONFIRMATION_ERROR_TEXT,
} from './constants';

export const SUBMIT_BUTTON_TITLE = 'RECOVER PASSWORD';

const useStyles = makeStyles({
  hintContent: {
    fontWeight: 300,
    letterSpacing: 0.25,
    marginBottom: '19px',
  },
});

const ResetPassword: FC = () => {
  const classes = useStyles();

  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [serverSideError] = useState('');

  useEffect(() => {
    const formIsValid = isValidEmail(password);

    setDisableSubmit(!formIsValid);
  }, [password]);

  const onPasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  const onRepeatedPasswordChange = (newValue: string) => {
    setRepeatedPassword(newValue);
  };

  const onSubmit = () => {
    const formValue = { email: password };

    setIsPasswordChanged(true);

    return formValue;
  };

  return !isPasswordChanged ? (
    <AuthPage>
      <Typography className={classes.hintContent} variant="body2">
        To reset your password, enter a new one below. You will be logged in
        with your new password.
      </Typography>
      <form noValidate data-testid="signIn-form">
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
          {SUBMIT_BUTTON_TITLE}
        </SubmitButton>
      </form>
      <ServerSideError serverSideErrorText={serverSideError} />
    </AuthPage>
  ) : (
    <Info
      title="PASSWORD CHANGED!"
      content="Your password has been successfully updated. You can now log in with your new password."
    />
  );
};

export default ResetPassword;
