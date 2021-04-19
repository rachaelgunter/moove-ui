import React, { FC } from 'react';
import { Box, makeStyles, Theme, Typography } from '@material-ui/core';

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
  margin: {
    marginBottom: theme.spacing(2),
    marginLeft: '-48px',
    marginRight: '-48px',
  },
  marginBetween: {
    marginLeft: '16px',
  },
}));

const SignIn: FC<SignInProps> = ({ hasGoogleAuth = false }: SignInProps) => {
  const classes = useStyles();

  return (
    <AuthPage>
      {hasGoogleAuth ? (
        <>
          <GoogleAuth hint={SIGN_IN_HINT} buttonText={SIGN_IN_BUTTON_TEXT} />
          <Typography
            className={classes.margin}
            variant="body2"
            component="p"
            align="center"
          >
            Don’t have a paid account?
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Sign up at&nbsp;
            <a
              className={classes.link}
              href="https://moove.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              moove.ai
            </a>
            {` or sign in`}&nbsp;
            <Link href="/" variant="body2">
              here
            </Link>
          </Typography>
        </>
      ) : (
        <>
          <SignInForm />
          <Footer>
            <Typography
              className={classes.margin}
              variant="body2"
              component="span"
              align="center"
            >
              Don’t have an account?&nbsp;
              <Link href="/sign-up" variant="body2">
                Sign Up
              </Link>
              <Box className={classes.marginBetween} component="span">
                <Link href="/forgot-password" variant="body2">
                  Forgot Password?
                </Link>
              </Box>
            </Typography>
            <Typography variant="body2" component="span" align="center">
              Have a paid account?&nbsp;
              <Link href="/premium" variant="body2">
                Sign in with Google
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
