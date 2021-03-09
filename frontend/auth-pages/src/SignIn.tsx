import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

import AuthPage from './AuthPage';
import Footer from './Footer';
import SignInForm from './SignInForm';
import Link from './Link';
import GoogleAuth from './GoogleAuth/GoogleAuth';

const SIGN_IN_HINT = 'SIGN IN TO YOUR ACCOUNT';
const SIGN_IN_BUTTON_TEXT = 'Log In with Google';

const SignIn: FC = () => (
  <AuthPage>
    <GoogleAuth hint={SIGN_IN_HINT} buttonText={SIGN_IN_BUTTON_TEXT} />
    <SignInForm />
    <Footer>
      <Typography variant="body2" component="span">
        Don’t have an account?&nbsp;
      </Typography>
      <Link href="/sign-up" variant="body2">
        Sign Up
      </Link>
    </Footer>
  </AuthPage>
);

export default SignIn;
