import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Tooltip } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';

import { BusinessVertical, JobFunction } from 'src/SignUpForm/types';
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
import { SignUpFormContext } from './SignUpFormContext';
import Link from '../Link';
import Autocomplete from '../Autocomplete';
import {
  BUSINESS_VERTICAL_DICTIONARY,
  JOB_FUNCTION_DICTIONARY,
} from '../queries';

export const submitButtonTitle = 'SIGN UP';
const SIGN_UP_ERROR = 'Unable to sign up. User with this email already exists.';

const useStyles = makeStyles({
  spinner: {
    minHeight: 300,
  },
});

const SignUpForm: FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(SignUpFormContext);
  const {
    fullName,
    email,
    password,
    businessVertical,
    jobFunction,
    repeatedPassword,
    termsAccepted,
  } = state;

  const [serverSideError, setServerSideError] = useState('');

  const history = useHistory();

  const [disableSubmit, setDisableSubmit] = useState(true);
  const { webAuth } = useContext(WebAuthProvider);
  const {
    loading: businessVerticalsLoading,
    data: businessVerticalsData,
  } = useQuery(BUSINESS_VERTICAL_DICTIONARY);
  const { loading: jobFunctionsLoading, data: jobFunctionsData } = useQuery(
    JOB_FUNCTION_DICTIONARY,
  );

  useEffect(() => {
    const formIsValid =
      fullName !== '' &&
      isValidEmail(email) &&
      isValidPassword(password) &&
      repeatedPassword === password &&
      termsAccepted &&
      businessVertical !== '' &&
      jobFunction !== '';

    setDisableSubmit(!formIsValid);
  }, [
    fullName,
    email,
    password,
    repeatedPassword,
    businessVertical,
    jobFunction,
    termsAccepted,
  ]);

  const onFullNameChange = (newValue: string) => {
    dispatch({ fullName: newValue });
  };

  const onEmailChange = (newValue: string) => {
    dispatch({ email: newValue });
  };

  const onPasswordChange = (newValue: string) => {
    dispatch({ password: newValue });
  };

  const onRepeatedPasswordChange = (newValue: string) => {
    dispatch({ repeatedPassword: newValue });
  };

  const onBusinessVerticalChange = (newValue: string) => {
    dispatch({ businessVertical: newValue });
  };

  const onJobFunctionChange = (newValue: string) => {
    dispatch({ jobFunction: newValue });
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
          jobFunction,
        },
      },
      (err) => {
        if (err) {
          setServerSideError(SIGN_UP_ERROR);
        } else {
          dispatch({
            fullName: '',
            email: '',
            password: '',
            repeatedPassword: '',
            businessVertical: '',
            jobFunction: '',
          });
          history.push('/verification');
        }
        setDisableSubmit(false);
      },
    );

    return formValue;
  };

  const businessVerticalOptions =
    businessVerticalsData?.businessVerticals?.map(
      ({ name }: BusinessVertical) => name,
    ) || [];
  const jobFunctionOptions =
    jobFunctionsData?.jobFunctions?.map(({ name }: JobFunction) => name) || [];

  if (businessVerticalsLoading || jobFunctionsLoading) {
    return (
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        className={classes.spinner}
      >
        <CircularProgress />
      </Grid>
    );
  }

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
        <Autocomplete
          data-testid="autocomplete__business-vertical"
          label="Business vertical"
          value={businessVertical}
          options={businessVerticalOptions}
          onChange={onBusinessVerticalChange}
        />
        <Autocomplete
          data-testid="autocomplete__job-function"
          label="Job function"
          value={jobFunction}
          options={jobFunctionOptions}
          onChange={onJobFunctionChange}
        />
        <Tooltip
          interactive
          title={
            <>
              You must accept our <Link href="terms">Terms</Link> before signing
              up
            </>
          }
          disableHoverListener={termsAccepted}
          disableFocusListener={termsAccepted}
          disableTouchListener={termsAccepted}
          placement="top"
          arrow
        >
          <div>
            <SubmitButton onClick={onSubmit} disabled={disableSubmit}>
              {submitButtonTitle}
            </SubmitButton>
          </div>
        </Tooltip>
      </form>
      <ServerSideError serverSideErrorText={serverSideError} />
    </>
  );
};

export default SignUpForm;
