import React, { FC } from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';

import AuthPage from './AuthPage';
import Footer from './Footer';
import SignUpForm from './SignUpForm';
import Link from './Link';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

const SignIn: FC = () => {
  const classes = useStyles();

  return (
    <AuthPage>
      <SignUpForm />
      <Footer>
        <Typography classes={classes} variant="body2" component="p">
          Already have an account?&nbsp;
          <Link href="/" variant="body2">
            Sign In
          </Link>
        </Typography>
        <Typography variant="body2" component="p">
          By signing up, you agree to our&nbsp;
          <Link href="/terms" variant="body2">
            terms
          </Link>
        </Typography>
      </Footer>
    </AuthPage>
  );
};

export default SignIn;
