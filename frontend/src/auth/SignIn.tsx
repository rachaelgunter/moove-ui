import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

import AuthPage from './AuthPage';
import Footer from './Footer';
import SignInForm from './SignInForm';
import Link from './Link';

const SignIn: FC = () => (
  <AuthPage>
    <SignInForm />
    <Footer>
      <Typography variant="body2" component="span">
        Don’t have an account?&nbsp;
      </Typography>
      <Link href="#" variant="body2">
        Sign Up
      </Link>
    </Footer>
  </AuthPage>
);

export default SignIn;
