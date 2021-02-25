import React, { FC, useEffect, useState } from 'react';

import TextField, { TextFieldType } from 'src/shared/TextField';
import SubmitButton from '../SubmitButton';
import { isValidEmail, isValidPassword } from '../utils';

export const submitButtonTitle = 'SIGN UP';

const SignUpForm: FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState(''); // TODO to rename
  const [disableSubmit, setDisableSubmit] = useState(true);

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
    const formValue = {
      fullName,
      email,
      password,
      password2: repeatedPassword,
    };

    setFullName('');
    setEmail('');
    setPassword('');
    setRepeatedPassword('');

    return formValue;
  };

  return (
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
      />
      <TextField
        type={TextFieldType.PASSWORD}
        label="Password"
        value={password}
        onChange={onPasswordChange}
        error={password !== '' && !isValidPassword(password)}
      />
      <TextField
        type={TextFieldType.PASSWORD}
        label="Repeat Password"
        value={repeatedPassword}
        onChange={onRepeatedPasswordChange}
        error={repeatedPassword !== '' && repeatedPassword !== password}
      />
      <SubmitButton onClick={onSubmit} disabled={disableSubmit}>
        {submitButtonTitle}
      </SubmitButton>
    </form>
  );
};

export default SignUpForm;
