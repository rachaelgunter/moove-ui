import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';

import theme from 'src/app/styles';
import SignInForm, { submitButtonTitle } from './SignInForm';

const createWrapper = () =>
  render(
    <ThemeProvider theme={theme}>
      <SignInForm />
    </ThemeProvider>,
  );

describe('Form', () => {
  describe('SubmitButton', () => {
    let wrapper: RenderResult;
    let email: HTMLInputElement;
    let password: HTMLInputElement;
    let submit: HTMLInputElement;

    beforeEach(() => {
      wrapper = createWrapper();
      email = wrapper.getByLabelText('Email') as HTMLInputElement;
      password = wrapper.getByLabelText('Password') as HTMLInputElement;
      submit = wrapper
        .getByText(submitButtonTitle)
        .closest('button') as HTMLInputElement;
    });

    describe('should not be disabled', () => {
      it('when email is valid and password is not empty', () => {
        fireEvent.change(email, { target: { value: 'valid-email@test.com' } });
        fireEvent.change(password, { target: { value: '123' } });

        expect(submit).not.toBeDisabled();
      });
    });

    describe('should be disabled', () => {
      it('when email is not valid and password is not empty', () => {
        fireEvent.change(email, { target: { value: 'invalid-email' } });
        fireEvent.change(password, { target: { value: '123' } });

        expect(submit).toBeDisabled();
      });

      it('when email is valid and password is empty', () => {
        fireEvent.change(email, { target: { value: 'valid-email@test.com' } });
        fireEvent.change(password, { target: { value: '' } });

        expect(submit).toBeDisabled();
      });

      it('when email is not valid and password is empty', () => {
        fireEvent.change(email, { target: { value: 'invalid-email' } });
        fireEvent.change(password, { target: { value: '' } });

        expect(submit).toBeDisabled();
      });
    });
  });
});
