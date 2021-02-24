import React, { FC, useEffect, useState } from 'react';

import TextField, { TextFieldType } from 'src/shared/TextField';
import SubmitButton from '../SubmitButton';
import isValidEmail from './utils';

export const submitButtonTitle = 'SIGN IN';

const SignInForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

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

    setEmail('');
    setPassword('');

    return formValue;
  };

  return (
    <form noValidate data-testid="signIn-form">
      <TextField
        type={TextFieldType.EMAIL}
        label="Email"
        value={email}
        onChange={onEmailChange}
        error={email !== '' && !isValidEmail(email)}
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
  );
};

export default SignInForm;
