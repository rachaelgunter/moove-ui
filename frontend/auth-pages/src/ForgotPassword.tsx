import React, { FC, useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import AuthPage from './AuthPage';
import TextField, { TextFieldType } from './TextField';
import isValidEmail from './SignInForm/utils';
import SubmitButton from './SubmitButton';
import Info from './Info';

export const SUBMIT_BUTTON_TITLE = 'RECOVER PASSWORD';

const useStyles = makeStyles({
  hintTitle: {
    marginBottom: '17px',
    fontWeight: 500,
  },
  hintContent: {
    fontWeight: 300,
    letterSpacing: 0.25,
    marginBottom: '19px',
  },
});

const ForgotPassword: FC = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    const formIsValid = isValidEmail(email);

    setDisableSubmit(!formIsValid);
  }, [email]);

  const onEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const onSubmit = () => {
    const formValue = { email };
    setDisableSubmit(true);
    setIsEmailSent(true);

    return formValue;
  };

  return !isEmailSent ? (
    <AuthPage>
      <Typography className={classes.hintTitle} variant="body1" align="center">
        TROUBLE SIGNING IN?
      </Typography>
      <Typography
        className={classes.hintContent}
        variant="body2"
        align="center"
      >
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </Typography>
      <form noValidate data-testid="signIn-form">
        <TextField
          type={TextFieldType.EMAIL}
          label="Email"
          value={email}
          onChange={onEmailChange}
          error={email !== '' && !isValidEmail(email)}
        />
        <SubmitButton onClick={onSubmit} disabled={disableSubmit}>
          {SUBMIT_BUTTON_TITLE}
        </SubmitButton>
      </form>
    </AuthPage>
  ) : (
    <Info
      title="EMAIL SENT!"
      content="An email was sent to you with details to reset your password."
    />
  );
};

export default ForgotPassword;
