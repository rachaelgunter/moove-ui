import React, { FC } from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';

import AuthPage from './AuthPage';
import Footer from './Footer';
import SignUpForm from './SignUpForm';
import Link from './Link';
import GoogleAuth from './GoogleAuth/GoogleAuth';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

const SIGN_UP_HINT = 'SIGN UP WITH GALILEO';
const SIGN_UP_BUTTON_TEXT = 'Sign Up with Google';

const SignIn: FC = () => {
  const classes = useStyles();

  return (
    <AuthPage>
      <GoogleAuth hint={SIGN_UP_HINT} buttonText={SIGN_UP_BUTTON_TEXT} />
      <SignUpForm />
      <Footer>
        <Typography classes={classes} variant="body2" component="p">
          Already have an account?&nbsp;
          <Link href="/" variant="body2">
            Sign In
          </Link>
        </Typography>
        <Typography variant="body2" component="p">
          By signing up, you agree to our terms
        </Typography>
      </Footer>
    </AuthPage>
  );
};

export default SignIn;
