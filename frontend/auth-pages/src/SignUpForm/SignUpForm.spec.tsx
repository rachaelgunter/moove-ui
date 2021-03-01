import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';

import theme from 'src/app/styles';
import SignUpForm, { submitButtonTitle } from './SignUpForm';

const createWrapper = () =>
  render(
    <ThemeProvider theme={theme}>
      <SignUpForm />
    </ThemeProvider>,
  );

describe('Form', () => {
  describe('SubmitButton', () => {
    let wrapper: RenderResult;
    let fullName: HTMLInputElement;
    let email: HTMLInputElement;
    let password: HTMLInputElement;
    let repeatedPassword: HTMLInputElement;
    let submit: HTMLInputElement;

    beforeEach(() => {
      wrapper = createWrapper();
      fullName = wrapper.getByLabelText('Full Name') as HTMLInputElement;
      email = wrapper.getByLabelText('Email') as HTMLInputElement;
      password = wrapper.getByLabelText('Password') as HTMLInputElement;
      repeatedPassword = wrapper.getByLabelText(
        'Repeat Password',
      ) as HTMLInputElement;
      submit = wrapper
        .getByText(submitButtonTitle)
        .closest('button') as HTMLInputElement;
    });

    describe('should not be disabled', () => {
      it('when all inputs have correct values', () => {
        fireEvent.change(fullName, { target: { value: 'Ivan Ivanov' } });
        fireEvent.change(email, { target: { value: 'valid-email@test.com' } });
        fireEvent.change(password, { target: { value: '*T3VRw89' } });
        fireEvent.change(repeatedPassword, { target: { value: '*T3VRw89' } });

        expect(submit).not.toBeDisabled();
      });
    });

    describe('should be disabled', () => {
      beforeEach(() => {
        fireEvent.change(fullName, { target: { value: 'Ivan Ivanov' } });
        fireEvent.change(email, { target: { value: 'valid-email@test.com' } });
        fireEvent.change(password, { target: { value: '*T3VRw89' } });
        fireEvent.change(repeatedPassword, { target: { value: '*T3VRw89' } });
      });

      it('when full name is empty', () => {
        fireEvent.change(email, { target: { value: 'invalid-email' } });

        expect(submit).toBeDisabled();
      });

      it('when email is not valid', () => {
        fireEvent.change(email, { target: { value: 'invalid-email' } });

        expect(submit).toBeDisabled();
      });

      it('when password is empty', () => {
        fireEvent.change(password, { target: { value: '' } });

        expect(submit).toBeDisabled();
      });

      it('when repeated password is empty', () => {
        fireEvent.change(repeatedPassword, { target: { value: '' } });

        expect(submit).toBeDisabled();
      });

      it('password and repeated password are not equal', () => {
        fireEvent.change(repeatedPassword, { target: { value: '123' } });

        expect(submit).toBeDisabled();
      });

      it('when all inputs have incorrect values', () => {
        fireEvent.change(fullName, { target: { value: '' } });
        fireEvent.change(email, { target: { value: 'invalid-email' } });
        fireEvent.change(password, { target: { value: '' } });
        fireEvent.change(repeatedPassword, { target: { value: '' } });

        expect(submit).toBeDisabled();
      });
    });
  });
});
