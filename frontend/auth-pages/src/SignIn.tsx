import React, { FC } from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';

import AuthPage from './AuthPage';
import Footer from './Footer';
import SignInForm from './SignInForm';
import Link from './Link';
import GoogleAuth from './GoogleAuth/GoogleAuth';

const SIGN_IN_HINT = 'SIGN IN TO YOUR ACCOUNT';
const SIGN_IN_BUTTON_TEXT = 'Log In with Google';

interface SignInProps {
  hasGoogleAuth?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.secondary.light,
    fontSize: '14px',
    fontFamily: 'Poppins, serif',
    fontWeight: 400,
    lineHeight: 1.43,
  },
}));

const SignIn: FC<SignInProps> = ({ hasGoogleAuth = false }: SignInProps) => {
  const classes = useStyles();

  return (
    <AuthPage>
      {hasGoogleAuth ? (
        <>
          <GoogleAuth hint={SIGN_IN_HINT} buttonText={SIGN_IN_BUTTON_TEXT} />
          <Typography variant="body2" component="p" align="center">
            Don’t have a paid account?
            <br />
            Sign up at&nbsp;
            <a
              className={classes.link}
              href="https://moove.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              moove.ai
            </a>
          </Typography>
        </>
      ) : (
        <>
          <SignInForm />
          <Footer>
            <Typography variant="body2" component="span" align="center">
              Don’t have an account?&nbsp;
              <Link href="/sign-up" variant="body2">
                Sign Up
              </Link>
            </Typography>
          </Footer>
        </>
      )}
    </AuthPage>
  );
};

SignIn.defaultProps = {
  hasGoogleAuth: false,
};

export default SignIn;
